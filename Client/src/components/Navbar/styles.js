import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  heading: {
    color: 'rgba(224, 72, 110, 1)',
    textDecoration: 'none',
    fontFamily: 'ubuntu',
    fontSize: '1.5rem',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '18em',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxHeight: '35px'
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    'user-select': 'none',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },

  [theme.breakpoints.down('xs')]:
  {
    appBar: {
      flexDirection: 'column',
    }
  }
}));