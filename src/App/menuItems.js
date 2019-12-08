import StarsIcon from '@material-ui/icons/Stars';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

const menuItems = [
  {
    text: 'Recomendaciones',
    Icon: StarsIcon,
    route: '/'
  },
  {
    text: 'Buscar música',
    Icon: SearchIcon,
    route: '/search'
  },
  {
    text: 'Toda la música',
    Icon: LibraryMusicIcon,
    route: '/albums'
  }
];

export default menuItems;
