import { getEvents, getWeeks, eventsInWeek, weekStats, addDays, daysToGala } from './campaign-data.mjs';

const $ = selector => document.querySelector(selector);
const escape = text => String(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const format = (date, options = {}) => new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'short', timeZone: 'UTC', ...options }).format(new Date(`${date}T00:00:00Z`));
const longDate = date => format(date, { weekday: 'long', month: 'long', year: 'numeric' });
const weekLabel = week => `${format(week)} – ${format(addDays(week, 6))}`;
const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.2"/></svg>';
const typeLabel = { post: 'Post', ticket: 'Ticket release', deadline: 'Portal closes' };
const state = { compare: 'none', filter: 'all', scale: 'macro', week: '2027-07-05' };
let visibleEvents = [];
let weeks = [];

function eventDate(event) {
  return event.approximate ? `≈ ${format(event.date)} – ${format(event.end)}` : format(event.date);
}
function eventTime(event) {
  const { milestone, type } = event;
  return type === 'ticket' ? `${milestone.time} AEST` : type === 'deadline' ? (milestone.deadlineTime ? `${milestone.deadlineTime} AEST` : 'Time not supplied') : milestone.immediate ? 'Campaign active immediately' : milestone.format || 'Round announcement';
}
function eventButton(event, compact = false) {
  const m = event.milestone;
  return `<button class="campaign-event ${compact ? 'compact-event' : ''} ${event.projected ? 'comparison-event' : ''}" data-event="${event.id}" aria-label="${escape(`${event.society}: ${m.short}, ${typeLabel[event.type]}, ${eventDate(event)}${m.artwork ? ', view artwork' : ''}`)}">
    <span class="event-date">${event.approximate ? '≈ July' : format(event.date, { month: 'short' })}${event.approximate ? '<small>11–20 July window</small>' : `<small>${event.type === 'post' ? 'ANNOUNCE' : event.type === 'ticket' ? 'RELEASE' : 'DEADLINE'}</small>`}</span>
    <span class="event-description"><span class="event-society">${event.society}${event.projected ? ' / projected' : ''}</span><strong>${escape(m.short)}</strong><span class="event-meta">${typeLabel[event.type]} · ${escape(eventTime(event))}</span></span>
    ${m.artwork ? `<img class="event-thumb" src="assets/marketing-${m.artwork}.png" alt="" loading="lazy" width="48" height="60">` : ''}<span class="event-arrow">${arrow}</span></button>`;
}

function renderMap() {
  const months = new Map();
  weeks.forEach(week => {
    const key = week.slice(0, 7);
    if (!months.has(key)) months.set(key, []);
    months.get(key).push(week);
  });
  $('#season-map').innerHTML = [...months].map(([month, dates]) => {
    const monthEvents = new Set(dates.flatMap(week => eventsInWeek(visibleEvents, week)).map(event => event.id));
    return `<div class="month-row"><div class="month-label"><strong>${format(`${month}-01`, { month: 'short', day: undefined })}</strong><span>${monthEvents.size} ${monthEvents.size === 1 ? 'event' : 'events'}</span></div><div class="month-weeks">${dates.map(week => {
      const stats = weekStats(visibleEvents, week);
      const sangam = stats.items.filter(event => event.society === 'Sangam').length;
      const comparison = stats.items.filter(event => event.society !== 'Sangam' && !event.approximate).length;
      const end = addDays(week, 6);
      const label = `${weekLabel(week)}: ${stats.posts} posts, ${stats.tickets} ticket releases, ${stats.deadlines} deadlines${stats.uncertain ? ', plus an approximate post window' : ''}`;
      return `<button class="week-cell ${stats.posts > 1 ? 'busy' : ''} ${stats.items.length ? 'has-events' : ''}" data-week="${week}" aria-label="${escape(label)}" title="${escape(label)}"><span class="week-range">${Number(week.slice(-2))}–${Number(end.slice(-2))}</span><span class="week-bars" aria-hidden="true"><i class="week-bar sangam-bar" style="--events:${sangam}"></i>${state.compare !== 'none' ? `<i class="week-bar comparison-bar" style="--events:${comparison}"></i>${stats.uncertain ? '<i class="week-bar comparison-bar uncertain-bar" style="--events:1"></i>' : ''}` : ''}</span><span class="week-count">${stats.items.length ? `${stats.items.length - stats.uncertain}${stats.uncertain ? ' + ≈1' : ''}` : '—'}<small>${stats.items.length && !stats.uncertain ? (stats.items.length === 1 ? ' event' : ' events') : ''}</small></span></button>`;
    }).join('')}</div></div>`;
  }).join('');
  const busy = weeks.map(week => ({ week, ...weekStats(visibleEvents, week) })).filter(stats => stats.posts > 1 || new Set(stats.items.map(event => event.society)).size > 1);
  $('#busy-weeks').innerHTML = busy.length ? `<p class="eyebrow">WEEKS TO WATCH</p><div>${busy.map(stats => `<button data-week="${stats.week}"><span>${weekLabel(stats.week)}</span><strong>${stats.posts > 1 ? `${stats.posts} posts` : 'Shared activity'}${stats.uncertain ? ' + possible overlap' : ''}</strong>${arrow}</button>`).join('')}</div>` : '';
}

function renderWeek() {
  if (!weeks.includes(state.week)) state.week = weeks.find(week => eventsInWeek(visibleEvents, week).length) || weeks[0];
  $('#week-select').innerHTML = weeks.map(week => `<option value="${week}" ${week === state.week ? 'selected' : ''}>${weekLabel(week)} 2027</option>`).join('');
  const index = weeks.indexOf(state.week);
  $('#week-prev').disabled = index === 0;
  $('#week-next').disabled = index === weeks.length - 1;
  const items = eventsInWeek(visibleEvents, state.week);
  const stats = weekStats(visibleEvents, state.week);
  const intro = `<div class="week-intro"><h3>${format(state.week, { month: 'long' })}<em> — ${format(addDays(state.week, 6), { month: 'long' })}</em></h3><p>${stats.posts} ${stats.posts === 1 ? 'post' : 'posts'} · ${stats.tickets} ${stats.tickets === 1 ? 'ticket release' : 'ticket releases'}${stats.deadlines ? ` · ${stats.deadlines} deadline` : ''}${stats.uncertain ? ' · 1 approximate post window' : ''}</p></div>`;
  $('#week-events').innerHTML = intro + (items.length ? items.map(event => eventButton(event)).join('') : `<div class="quiet-week"><span aria-hidden="true">—</span><h3>A little breathing room.</h3><p>No ${state.filter === 'all' ? 'activity' : state.filter === 'ticket' ? 'ticket releases' : 'posts'} scheduled in this view.</p></div>`);
}

function renderRegister() {
  $('#milestone-list').innerHTML = visibleEvents.length ? visibleEvents.map(event => eventButton(event, true)).join('') : '<p>No milestones in this view.</p>';
}

function render() {
  visibleEvents = getEvents(state.compare, state.filter);
  weeks = getWeeks(state.compare);
  const root = $('#marketing-schedule');
  root.dataset.comparison = state.compare;
  document.querySelectorAll('[data-compare]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.compare === state.compare)));
  document.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === state.filter)));
  document.querySelectorAll('[data-scale]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.scale === state.scale)));
  $('#campaign-macro').hidden = state.scale !== 'macro';
  $('#campaign-micro').hidden = state.scale !== 'micro';
  $('.campaign-register').hidden = state.scale !== 'macro';
  $('#comparison-key').hidden = state.compare === 'none';
  $('#comparison-key span').textContent = `${state.compare} / projected`;
  $('#comparison-note').textContent = state.compare === 'none'
    ? 'Sangam’s proposed 2027 campaign. Select a society to compare the calendar.'
    : `${state.compare} uses the supplied 2026 dates on the same month/day in 2027. This is a planning comparison, not a confirmed 2027 schedule.${state.compare === 'SLA' ? ' The mid-July sold-out post is approximate (11–20 July).' : ''}`;
  const posts = visibleEvents.filter(event => event.type === 'post').length;
  const tickets = visibleEvents.filter(event => event.type === 'ticket').length;
  const deadlines = visibleEvents.filter(event => event.type === 'deadline').length;
  $('#campaign-summary').innerHTML = `<span><strong>${String(posts).padStart(2, '0')}</strong> posts${state.compare === 'SLA' && state.filter !== 'ticket' ? ' (1 approximate)' : ''}</span><span><strong>${String(tickets).padStart(2, '0')}</strong> releases</span>${deadlines ? `<span><strong>${String(deadlines).padStart(2, '0')}</strong> ${deadlines === 1 ? 'deadline' : 'deadlines'}</span>` : ''}<span class="campaign-end">The gala <b>21.11.27</b></span>`;
  renderMap();
  renderWeek();
  renderRegister();
}

function showWeek(week) {
  state.week = week;
  state.scale = 'micro';
  render();
  $('#campaign-micro').scrollIntoView({ behavior: 'instant', block: 'start' });
  $('#week-select').focus({ preventScroll: true });
}

$('#marketing-schedule').addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.compare) { state.compare = button.dataset.compare; render(); }
  if (button.dataset.filter) { state.filter = button.dataset.filter; render(); }
  if (button.dataset.scale) { state.scale = button.dataset.scale; render(); }
  if (button.dataset.week) showWeek(button.dataset.week);
  if (button.dataset.event) openPreview(button.dataset.event, button);
});
$('#week-select').addEventListener('change', event => { state.week = event.target.value; renderWeek(); });
$('#week-prev').addEventListener('click', () => { state.week = weeks[weeks.indexOf(state.week) - 1]; renderWeek(); });
$('#week-next').addEventListener('click', () => { state.week = weeks[weeks.indexOf(state.week) + 1]; renderWeek(); });

const preview = $('#campaign-preview');
let previewTrigger;
function openPreview(id, trigger) {
  const event = visibleEvents.find(item => item.id === id);
  if (!event) return;
  previewTrigger = trigger;
  const m = event.milestone;
  $('#preview-kicker').textContent = `${event.society} / ${typeLabel[event.type]}${event.projected ? ' / 2026 reference' : ''}`;
  $('#preview-title').textContent = m.title;
  $('#preview-strategy').textContent = m.strategy || `${event.society}’s supplied 2026 schedule, projected onto 2027 to compare campaign workload.`;
  const dates = ['post', 'ticket', 'deadline'].filter(type => m[type]).map(type => {
    const sourceDate = m[type];
    const date = event.projected ? `2027${sourceDate.slice(4)}` : sourceDate;
    const approximate = type === 'post' && m.approximate;
    const label = approximate ? 'Around mid-July 2027' : longDate(date);
    const time = type === 'ticket' ? ` · ${m.time} AEST` : type === 'deadline' && m.deadlineTime ? ` · ${m.deadlineTime} AEST` : '';
    const source = event.projected ? `<small>Source: ${approximate ? '~mid-July 2026' : longDate(sourceDate)}</small>` : `<small>${daysToGala(date)} days to the gala${m.immediate && type === 'post' ? ' · Campaign active immediately' : ''}</small>`;
    return `<div class="${event.type === type ? 'selected-date' : ''}"><dt>${typeLabel[type]}${event.projected ? ' (projected)' : ''}</dt><dd>${label}${time}${source}</dd></div>`;
  }).join('');
  $('#preview-dates').innerHTML = dates + (m.lead ? `<div><dt>Original lead time</dt><dd>${escape(m.lead)}<small>Relative to the society’s own 2026 event</small></dd></div>` : '');
  $('#preview-price').textContent = m.price || '';
  $('#preview-note').textContent = m.artworkNote || (event.projected ? 'Historical reference only. Projected weekdays may differ from the original campaign. Confirm the society’s 2027 dates before coordinating posts.' : 'Working campaign plan. Creative and final details are subject to confirmation.');
  const image = $('#preview-image');
  image.hidden = !m.artwork;
  $('#preview-placeholder').hidden = Boolean(m.artwork);
  $('#preview-original').hidden = !m.artwork;
  if (m.artwork) {
    image.src = `assets/marketing-${m.artwork}.png`;
    image.alt = `${m.short} — supplied Sangam campaign graphic${m.artworkNote ? '; see the draft note alongside' : ''}`;
    $('#preview-original').href = image.src;
  } else {
    $('#preview-placeholder .eyebrow').textContent = `${event.society} / ${m.format || typeLabel[event.type]}`;
    $('#preview-placeholder .placeholder-title').textContent = m.short;
    $('#preview-placeholder small').textContent = event.projected ? 'Reference schedule · no artwork supplied' : 'Artwork to come';
  }
  preview.showModal();
  document.body.classList.add('preview-open');
  $('#preview-close').focus({ preventScroll: true });
}
$('#preview-close').addEventListener('click', () => preview.close());
preview.addEventListener('click', event => { if (event.target === preview) { const box = preview.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) preview.close(); } });
preview.addEventListener('close', () => { document.body.classList.remove('preview-open'); previewTrigger?.focus({ preventScroll: true }); });
render();
