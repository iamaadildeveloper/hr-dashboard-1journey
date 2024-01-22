// assets
import {
  AppstoreAddOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ErrorIcon from '@mui/icons-material/Error';
import WebIcon from '@mui/icons-material/Web';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PolicyIcon from '@mui/icons-material/Policy';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
// icons
const icons = {
  BusinessCenterIcon,
  AttachMoneyIcon,
  ErrorIcon,
  WebIcon,
  LoadingOutlined,
  AppstoreAddOutlined,
  PeopleAltIcon,
  YoutubeSearchedForIcon,
  ThumbDownIcon,
  NewspaperIcon,
  DateRangeIcon,
  PolicyIcon,
  ModelTrainingIcon,
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Apps',
  type: 'group',
  children: [
    {
      id: 'employee',
      title: 'Manage Employee',
      type: 'item',
      url: '/Employee',
      icon: icons.PeopleAltIcon
    },
    {
      id: 'job-app',
      title: 'Job Applications',
      type: 'item',
      url: '/jobapplications',
      icon: icons.NewspaperIcon,
      breadcrumbs: false
    },
    {
      id: 'util-typography',
      title: 'Emp Applications',
      type: 'item',
      url: '/typography',
      icon: icons.BusinessCenterIcon
    },
    {
      id: 'util-color',
      title: 'Payroll Management',
      type: 'item',
      url: '/color',
      icon: icons.AttachMoneyIcon
    },
    {
      id: 'util-shadow',
      title: 'Tutor GC Docs',
      type: 'item',
      url: '/shadow',
      icon: icons.ErrorIcon
    },
    {
      id: 'ant-icons',
      title: 'Expence Management',
      type: 'item',
      url: '/icons/ant',
      icon: icons.WebIcon,
      breadcrumbs: false
    },
    {
      id: 'ant-icons',
      title: 'Quaterly Management',
      type: 'item',
      url: '/icons/ant',
      icon: icons.YoutubeSearchedForIcon,
      breadcrumbs: false
    },
    {
      id: 'ant-icons',
      title: 'Complaints',
      type: 'item',
      url: '/icons/ant',
      icon: icons.ThumbDownIcon,
      breadcrumbs: false
    },
    {
      id: 'ant-icons',
      title: 'Events',
      type: 'item',
      url: '/icons/ant',
      icon: icons.DateRangeIcon,
      breadcrumbs: false
    },
    {
      id: 'ant-icons',
      title: 'Policy',
      type: 'item',
      url: '/icons/ant',
      icon: icons.PolicyIcon,
      breadcrumbs: false
    },
    {
      id: 'ant-icons',
      title: 'Trainig & Development',
      type: 'item',
      url: '/icons/ant',
      icon: icons.ModelTrainingIcon,
      breadcrumbs: false,
    

    },
  ]
};

export default utilities;
