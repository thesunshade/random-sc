export default function getFullBookName(book) {
  const bookNames = {
    DN: "Dīgha Nikāya",
    MN: "Majjhima Nikāya",
    SN: "Saṁyutta Nikāya",
    AN: "Aṅguttara Nikāya",
    Kp: "Khuddakapāṭha",
    Dhp: "Dhammapada",
    Ud: "Udāna",
    Iti: "Itivuttaka",
    Snp: "Sutta Nipāta",
    Vv: "Vimānavatthu",
    Pv: "Petavatthu",
    Thag: "Theragātha",
    Thig: "Therīgāthā",
    Ja: "Jātaka",
  };
  return bookNames[book];
}
