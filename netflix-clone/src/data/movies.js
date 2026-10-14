export const GENRES = ['Action', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Romance', 'Thriller']

export const REGIONS = [
  { id: 'korean', label: 'Korean dramas', blurb: 'Slow-burn romance, revenge, and ramyeon at midnight.' },
  { id: 'american', label: 'American dramas', blurb: 'Prestige crime, sitcom comfort, and cliffhangers.' },
]

// `hue` drives the generated poster gradient (no image assets in this app).
export const MOVIES = [
  { id: 'crash-landing-on-you', title: 'Crash Landing on You', region: 'korean', year: 2019, genres: ['Romance', 'Comedy'], hue: 350, description: 'A paragliding accident drops a South Korean heiress across the border, into the care of a stern North Korean officer who hides her while they plan her way home.' },
  { id: 'squid-game', title: 'Squid Game', region: 'korean', year: 2021, genres: ['Thriller', 'Action'], hue: 330, description: 'Hundreds of people buried in debt accept an invitation to play children’s games for a fortune, then learn what losing costs.' },
  { id: 'goblin', title: 'Goblin', region: 'korean', year: 2016, genres: ['Fantasy', 'Romance'], hue: 210, description: 'An immortal goblin, cursed for centuries, needs a human bride to end his life. Then a cheerful high schooler says she can see him.' },
  { id: 'reply-1988', title: 'Reply 1988', region: 'korean', year: 2015, genres: ['Drama', 'Comedy'], hue: 30, description: 'Five families share one Seoul alley in 1988, following their kids through exams, first loves, and the Olympics on TV.' },
  { id: 'signal', title: 'Signal', region: 'korean', year: 2016, genres: ['Crime', 'Thriller'], hue: 190, description: 'A profiler finds a walkie-talkie that connects him to a detective living in 1989, and together they reopen cold cases across time.' },
  { id: 'itaewon-class', title: 'Itaewon Class', region: 'korean', year: 2020, genres: ['Drama'], hue: 15, description: 'An ex-con opens a small bar in Itaewon to take on the food empire run by the family that ruined his father.' },
  { id: 'kingdom', title: 'Kingdom', region: 'korean', year: 2019, genres: ['Thriller', 'Action'], hue: 0, description: 'In Joseon-era Korea, a crown prince investigating his father’s mysterious illness uncovers a plague that raises the dead.' },
  { id: 'hotel-del-luna', title: 'Hotel del Luna', region: 'korean', year: 2019, genres: ['Fantasy', 'Romance'], hue: 270, description: 'A sharp-tongued owner runs a hotel for ghosts in downtown Seoul, until a by-the-book manager signs on to help guests move on.' },
  { id: 'extraordinary-attorney-woo', title: 'Extraordinary Attorney Woo', region: 'korean', year: 2022, genres: ['Drama', 'Comedy'], hue: 200, description: 'A brilliant autistic lawyer with a love of whales joins a top law firm and takes on cases nobody else can crack.' },
  { id: 'vincenzo', title: 'Vincenzo', region: 'korean', year: 2021, genres: ['Crime', 'Comedy'], hue: 45, description: 'A Korean-Italian mafia consigliere returns to Seoul for hidden gold and ends up fighting a corrupt conglomerate his own way.' },
  { id: 'the-glory', title: 'The Glory', region: 'korean', year: 2022, genres: ['Thriller', 'Drama'], hue: 280, description: 'Years after brutal school bullying, a woman becomes a teacher at her chief tormentor’s daughter’s school, and sets her plan in motion.' },
  { id: 'moving', title: 'Moving', region: 'korean', year: 2023, genres: ['Action', 'Fantasy'], hue: 220, description: 'Teenagers who hide their superpowers, and the parents who once worked as secret agents, are hunted by the people who want them gone.' },
  { id: 'business-proposal', title: 'Business Proposal', region: 'korean', year: 2022, genres: ['Romance', 'Comedy'], hue: 320, description: 'Standing in for her friend on a blind date, an office worker discovers the man across the table is her company’s CEO.' },
  { id: 'hospital-playlist', title: 'Hospital Playlist', region: 'korean', year: 2020, genres: ['Drama', 'Comedy'], hue: 160, description: 'Five doctors who have been friends since medical school balance surgeries, family, and a weekly band practice.' },
  { id: 'my-mister', title: 'My Mister', region: 'korean', year: 2018, genres: ['Drama'], hue: 240, description: 'A worn-down engineer and a young temp carrying heavy debts find quiet understanding in each other through a hard winter.' },
  { id: 'mr-sunshine', title: 'Mr. Sunshine', region: 'korean', year: 2018, genres: ['Drama', 'Romance', 'Action'], hue: 25, description: 'A Korean-born US Marine returns to Joseon in 1900 and falls for a noblewoman secretly fighting for independence.' },
  { id: 'stranger', title: 'Stranger', region: 'korean', year: 2017, genres: ['Crime', 'Thriller'], hue: 180, description: 'An emotionless prosecutor and an upright detective team up to unravel a murder tied to corruption inside the prosecution office.' },
  { id: 'descendants-of-the-sun', title: 'Descendants of the Sun', region: 'korean', year: 2016, genres: ['Romance', 'Action'], hue: 55, description: 'An army captain and a surgeon meet in Seoul, part ways, then reunite in a war-torn country where duty keeps pulling them apart.' },

  { id: 'breaking-bad', title: 'Breaking Bad', region: 'american', year: 2008, genres: ['Crime', 'Drama', 'Thriller'], hue: 90, description: 'A chemistry teacher with a terminal diagnosis starts cooking meth to provide for his family and discovers a talent for the business.' },
  { id: 'stranger-things', title: 'Stranger Things', region: 'american', year: 2016, genres: ['Fantasy', 'Thriller'], hue: 355, description: 'When a boy vanishes in a small Indiana town in 1983, his friends meet a girl with strange powers who knows where he went.' },
  { id: 'greys-anatomy', title: "Grey's Anatomy", region: 'american', year: 2005, genres: ['Drama', 'Romance'], hue: 195, description: 'Surgical interns at a Seattle hospital learn medicine under pressure while their personal lives get tangled in the halls.' },
  { id: 'the-office', title: 'The Office', region: 'american', year: 2005, genres: ['Comedy'], hue: 215, description: 'A documentary crew follows the employees of a paper company in Scranton and their wildly unqualified regional manager.' },
  { id: 'succession', title: 'Succession', region: 'american', year: 2018, genres: ['Drama'], hue: 40, description: 'As their father’s health wavers, four siblings fight for control of one of the world’s largest media empires.' },
  { id: 'friends', title: 'Friends', region: 'american', year: 1994, genres: ['Comedy', 'Romance'], hue: 300, description: 'Six friends in Manhattan navigate jobs, breakups, and apartments, mostly from the same couch at the same coffee shop.' },
  { id: 'mindhunter', title: 'Mindhunter', region: 'american', year: 2017, genres: ['Crime', 'Thriller'], hue: 140, description: 'In the late 1970s, two FBI agents interview imprisoned serial killers to understand how they think, and to catch the next one.' },
  { id: 'the-bear', title: 'The Bear', region: 'american', year: 2022, genres: ['Drama', 'Comedy'], hue: 210, description: 'A fine-dining chef comes home to Chicago to run his late brother’s chaotic sandwich shop, and tries to make it great.' },
  { id: 'ozark', title: 'Ozark', region: 'american', year: 2017, genres: ['Crime', 'Thriller'], hue: 185, description: 'A financial planner moves his family to the Missouri Ozarks to launder money for a cartel, after a scheme goes badly wrong.' },
  { id: 'this-is-us', title: 'This Is Us', region: 'american', year: 2016, genres: ['Drama'], hue: 20, description: 'Across decades, a family with three siblings born on the same day works through love, loss, and the stories that shaped them.' },
  { id: 'the-walking-dead', title: 'The Walking Dead', region: 'american', year: 2010, genres: ['Action', 'Thriller'], hue: 60, description: 'A sheriff’s deputy wakes from a coma into a world overrun by the dead and leads survivors in search of somewhere safe.' },
  { id: 'bridgerton', title: 'Bridgerton', region: 'american', year: 2020, genres: ['Romance', 'Drama'], hue: 250, description: 'During London’s Regency social season, the eldest Bridgerton daughter makes her debut while an anonymous gossip writer watches.' },
  { id: 'wednesday', title: 'Wednesday', region: 'american', year: 2022, genres: ['Fantasy', 'Comedy'], hue: 265, description: 'Wednesday Addams enrolls at Nevermore Academy and investigates a string of murders while mastering her psychic gift.' },
  { id: 'the-last-of-us', title: 'The Last of Us', region: 'american', year: 2023, genres: ['Action', 'Drama'], hue: 110, description: 'Twenty years after a fungal outbreak, a hardened smuggler escorts a teenage girl across a ruined America.' },
  { id: 'gilmore-girls', title: 'Gilmore Girls', region: 'american', year: 2000, genres: ['Comedy', 'Drama'], hue: 10, description: 'A fast-talking single mother and her bookish daughter take on life, school, and coffee in the small town of Stars Hollow.' },
  { id: 'yellowstone', title: 'Yellowstone', region: 'american', year: 2018, genres: ['Drama', 'Action'], hue: 35, description: 'The Dutton family fights land developers, a reservation, and each other to hold the largest ranch in the United States.' },
  { id: 'westworld', title: 'Westworld', region: 'american', year: 2016, genres: ['Fantasy', 'Thriller'], hue: 175, description: 'In a theme park staffed by lifelike android hosts, some of the hosts begin to remember what guests have done to them.' },
  { id: 'the-good-place', title: 'The Good Place', region: 'american', year: 2016, genres: ['Comedy', 'Fantasy'], hue: 75, description: 'A selfish woman wakes up in the afterlife’s good place by clerical mistake and tries to become a better person before anyone notices.' },
]

export function getMovie(id) {
  return MOVIES.find((movie) => movie.id === id)
}
