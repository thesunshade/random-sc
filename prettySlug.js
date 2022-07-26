export function prettySlug(slug) {
  slug = slug
    .replace("dn", "DN ")
    .replace("mn", "MN ")
    .replace("snp", "Snp ")
    .replace("sn", "SN ")
    .replace("an", "AN ")
    .replace("kp", "Kp ")
    .replace("dhp", "Dhp ")
    .replace("ud", "Ud ")
    .replace("iti", "Iti ")
    .replace("vv", "Vv ")
    .replace("pv", "Pv ")
    .replace("thag", "Thag ")
    .replace("thig", "Thig ")
    .replace("ja", "Ja ");

  return slug;
}
