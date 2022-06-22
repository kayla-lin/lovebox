class Package {
  name: string;
  partner: string;
  partnerUID: string;
  streak: number;
  lastOpened: string;
  id: string;
  freq: string;
  size: number;
  unopenedCount: number;
  seen: string[];

  constructor(
    name: string = "",
    partner: string = "",
    partnerUID: string = "",
    streak: number = -1,
    lastOpened: string = "",
    id: string = "",
    freq: string = "",
    size: number = -1,
    unopenedCount: number = -1,
    seen: string[] = []
  ) {
    this.name = name;
    this.partner = partner;
    this.partnerUID = partnerUID;
    this.streak = streak;
    this.lastOpened = lastOpened;
    this.id = id;
    this.freq = freq;
    this.size = size;
    this.unopenedCount = unopenedCount;
    this.seen = seen;
  }
}

export default Package;
