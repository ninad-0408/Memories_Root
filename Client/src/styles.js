import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      heading: {
        color: 'rgba(224, 72, 110, 1)',
        fontSize: '2.0rem',
      },
      image: {
        marginLeft: '15px',
      },
}));

export default useStyles;