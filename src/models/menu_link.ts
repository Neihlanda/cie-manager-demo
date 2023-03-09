const essentialLinks = [
  {
    title: 'Accueil',
    link: '/',
    icon: 'home',
  },
  {
    title: 'Base',
    link: '/personnels',
    icon: 'person',
  },
  {
    title: 'Opérationnel',
    link: '/',
    icon: 'bolt',
  },
  {
    title: 'Traditions',
    link: '/',
    icon: 'checkroom',
  },
  {
    title: 'Prerequis',
    sublink: [
      {
        title: 'Secourisme',
        link: '/prerequisSecourisme',
        icon: 'medication_liquid',
      },
      {
        title: 'ISTC',
        link: '/prerequisISTC',
        icon: 'mode_standby',
      },
      {
        title: 'IEC',
        link: '/prerequisIEC',
        icon: 'directions_car',
      },
      {
        title: 'TIOR',
        link: '/prerequisTIOR',
        icon: 'sports_mma',
      },
    ],
  },
];

export default essentialLinks;
