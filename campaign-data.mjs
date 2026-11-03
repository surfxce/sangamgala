// Planning dates use Brisbane calendar days. Historical comparisons retain
// their source dates and are projected by month/day, never presented as bookings.
export const GALA_DATE = '2027-11-21';
export const DAY = 86400000;
export const dateValue = date => Date.parse(`${date}T00:00:00Z`);
export const dateKey = value => new Date(value).toISOString().slice(0, 10);
export const daysToGala = date => Math.round((dateValue(GALA_DATE) - dateValue(date)) / DAY);
export function monday(date) {
  const value = dateValue(date);
  return dateKey(value - ((new Date(value).getUTCDay() + 6) % 7) * DAY);
}
export const addDays = (date, days) => dateKey(dateValue(date) + days * DAY);

export const campaigns = {
  Sangam: [
    { id: 'save-date', title: 'Save the Date Graphic / Motion Loop', short: 'Save the date', post: '2027-07-07', format: 'Graphic / motion loop', artwork: 'save-the-date', artworkNote: 'This supplied draft says 22 November. Update the artwork to 21 November 2027 before posting.', strategy: 'Drop the botanical motion loop across all six Instagram grids. Lock the date into student group calendars before Semester 2 starts.' },
    { id: 'reveal', title: 'Official Coalition & Cause Reveal', short: 'Coalition & cause reveal', post: '2027-08-04', format: 'Joint carousel', artwork: 'ball-reveal', artworkNote: 'This supplied draft says 22 November; the planning date is 21 November 2027. The Sofitel venue shown in the artwork is still to be confirmed.', strategy: 'Officially announce the six societies, the nominated charity, and the formal black-tie / saree dress code in a shared carousel.' },
    { id: 'presale', title: 'Exec Presale & Table Captain Drop', short: 'Exec presale & table captains', post: '2027-08-16', ticket: '2027-08-20', time: '6:00 PM', format: 'Private announcement', artwork: 'early-bird', price: '$150 member / $160 non-member', strategy: 'Match the approximately 13-week early bird precedent. Distribute privately through internal WhatsApp / Discord to secure the 300-seat safety floor and cash deposit.' },
    { id: 'gofundme', title: 'Direct-to-Charity GoFundMe Launch', short: 'GoFundMe launch', post: '2027-09-01', format: 'Public campaign launch', immediate: true, strategy: 'Launch the external GoFundMe for family, alumni and community networks, while clearing the feed for ISC’s Indian Ball campaign.' },
    { id: 'main', title: 'Main Round Drop (Post-Ball Surge)', short: 'Main round', post: '2027-10-04', ticket: '2027-10-08', time: '6:00 PM', format: 'Public ticket announcement', artwork: 'main-round', price: '$165 member / $175 non-member', strategy: 'Plan the announcement for the morning after Indian Ball weekend. All six societies, including ISC, open public ticketing under the “post-exam freedom gala” banner. Timing depends on confirmation of ISC’s 2027 event.' },
    { id: 'included', title: '“What’s Included” & Auction Teaser', short: 'What’s included & auction teaser', post: '2027-10-13', format: 'Hype reel', strategy: 'Show the two-course plated banquet, photographer coverage, and a teaser of the first three Executive Experience lots, such as Basque cheesecakes and curated playlists.' },
    { id: 'dj', title: 'DJ Lineup Reveal', short: 'DJ lineup reveal', post: '2027-10-20', format: 'Artist tile', strategy: 'Announce the headline DJ and a multi-genre set list: Bollywood, Tollywood, Sinhala baila and commercial party throwbacks.' },
    { id: 'final', title: 'Final Round Drop', short: 'Final round', post: '2027-10-25', ticket: '2027-10-29', time: '6:00 PM', format: 'Ticket announcement', artwork: 'final-round', price: '$175 member / $185 non-member', strategy: 'Release the final standard tier before SWOTVAC begins, driving urgency as tables fill up.' },
    { id: 'seating', title: 'Seating & Dietary Portal Opens', short: 'Seating & dietaries', post: '2027-11-01', deadline: '2027-11-07', deadlineTime: '11:59 PM', format: 'Portal announcement', strategy: 'Table Captains use their Order ID + mobile number to finalise seats and dietary requirements. Lock the portal on 7 November, fourteen days before the gala, for kitchen procurement.' },
    { id: 'fomo', title: 'FOMO / Final Call (Remaining Seats)', short: 'FOMO / final call', post: '2027-11-08', ticket: '2027-11-10', time: '6:00 PM', format: 'Final ticket announcement', artwork: 'fomo-round', price: '$190 member / $200 non-member', strategy: 'Release returned, unassigned sponsor or reallocated seats at the highest price tier.' },
    { id: 'housekeeping', title: 'Housekeeping, Transport & Entry', short: 'Housekeeping, transport & entry', post: '2027-11-18', format: 'Logistics infographic', strategy: 'Share venue parking, nearby transit, 18+ physical ID checks, and strict door opening and closing times in the final logistics carousel.' }
  ],
  ISC: [
    { id: 'save-date', title: 'Save the Date', short: 'Save the date', post: '2026-05-22', format: 'Teaser', lead: '135 days out (~4.5 months)' },
    { id: 'reveal', title: 'Theme / Ball Reveal', short: 'Theme / ball reveal', post: '2026-06-24', format: 'Official announcement', lead: '102 days out (~3.4 months)' },
    { id: 'early', title: 'Early Bird Round', short: 'Early bird round', post: '2026-06-29', ticket: '2026-07-03', time: '6:00 PM', price: '$135 member / $145 non-member', lead: '93 days out (~13.3 weeks)' },
    { id: 'main', title: 'Main Round', short: 'Main round', post: '2026-07-27', ticket: '2026-07-31', time: '6:00 PM', price: '$150 member / $155 non-member', lead: '65 days out (~9.3 weeks)' },
    { id: 'final', title: 'Final Round', short: 'Final round', post: '2026-08-29', ticket: '2026-09-02', time: '6:00 PM', price: '$160 member / $165 non-member', lead: '32 days out (~4.6 weeks)' },
    { id: 'fomo', title: 'FOMO Round', short: 'FOMO round', post: '2026-09-07', ticket: '2026-09-11', time: '6:00 PM', price: '$160 member / $165 non-member', lead: '23 days out (~3.3 weeks)' },
    { id: 'tables', title: 'Table Allocations Open', short: 'Table allocations', post: '2026-09-17', deadline: '2026-09-30', lead: '17 days out; closed 4 days out' }
  ],
  SLA: [
    { id: 'sold-two', title: 'Round 2 Sold Out Post', short: 'Round 2 sold out', post: '2026-04-29', format: 'Sold-out announcement', lead: '86+ days out (>12 weeks)', strategy: 'Rounds 1 and 2 dropped before late April. Exact release dates were not supplied.' },
    { id: 'third', title: 'Round 3', short: 'Round 3', post: '2026-05-09', ticket: '2026-05-13', time: '6:00 PM', price: '$120 member / $125 non-member', lead: '72 days out (~10.3 weeks)' },
    { id: 'surprise', title: 'Surprise Round', short: 'Surprise round', post: '2026-05-23', ticket: '2026-05-27', time: '6:00 PM', price: '$120 member / $125 non-member', lead: '58 days out (~8.3 weeks)' },
    { id: 'fomo', title: 'FOMO Round', short: 'FOMO round', post: '2026-07-06', ticket: '2026-07-08', time: '6:00 PM', price: '$130 member / $135 non-member', lead: '16 days out (~2.3 weeks)' },
    // No exact date was supplied: show a range, not an invented day.
    { id: 'sold-out', title: 'Fully Sold Out Post', short: 'Fully sold out', post: '2026-07-11', rangeEnd: '2026-07-20', approximate: true, format: 'Sold-out announcement', lead: '~10 days out', strategy: 'The source places this post around mid-July 2026. The calendar uses an approximate 11–20 July window, not an exact posting date.' }
  ]
};

export function getEvents(compare = 'none', filter = 'all') {
  const societies = compare === 'none' ? ['Sangam'] : ['Sangam', compare];
  return societies.flatMap(society => campaigns[society].flatMap(milestone => {
    return ['post', 'ticket', 'deadline'].filter(type => milestone[type]).map(type => {
      const sourceDate = milestone[type];
      const projected = society !== 'Sangam';
      const date = projected ? `2027${sourceDate.slice(4)}` : sourceDate;
      const end = type === 'post' && milestone.rangeEnd ? `2027${milestone.rangeEnd.slice(4)}` : date;
      return { id: `${society}-${milestone.id}-${type}`, society, milestone, type, date, end, sourceDate, projected, approximate: type === 'post' && Boolean(milestone.approximate) };
    });
  })).filter(event => filter === 'all' || event.type === filter)
    .sort((a, b) => a.date.localeCompare(b.date) || a.society.localeCompare(b.society) || a.type.localeCompare(b.type));
}

export function getWeeks(compare = 'none') {
  const events = getEvents(compare);
  const first = events[0].date.slice(0, 7) + '-01';
  // Keep each Monday under the month it starts in; include the source's first week.
  let start = monday(first);
  if (start.slice(0, 7) !== first.slice(0, 7)) start = addDays(start, 7);
  const weeks = [];
  for (let date = start; date <= GALA_DATE; date = addDays(date, 7)) weeks.push(date);
  return weeks;
}

export function eventsInWeek(events, week) {
  const end = addDays(week, 6);
  return events.filter(event => event.date <= end && event.end >= week);
}

export function weekStats(events, week) {
  const items = eventsInWeek(events, week);
  const exactPosts = items.filter(event => event.type === 'post' && !event.approximate);
  return {
    items,
    posts: exactPosts.length,
    tickets: items.filter(event => event.type === 'ticket').length,
    deadlines: items.filter(event => event.type === 'deadline').length,
    uncertain: items.filter(event => event.approximate).length,
    shared: new Set(exactPosts.map(event => event.society)).size > 1
  };
}
