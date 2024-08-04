import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from './Constants';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const Styles = StyleSheet.create({
  sectionBg: {
    backgroundColor: COLORS.baseColor,
    //height: deviceHeight,
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.baseColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  overviewHeading: {
    fontSize: 19,
    color: COLORS.lightred,
    alignSelf: 'center',
    marginStart: 2,
  },
  customButtonContainer: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#e32f45',
  },
  heading: {
    fontSize: 19,
    margin: 15,
    color: COLORS.lightred,
  },
  headingMovies: {
    fontSize: 19,
    marginHorizontal: 15,
    marginVertical: 10,
    color: COLORS.lightred,
  },

  trendingPeopleContainer: {
    marginHorizontal: 10,
  },
  trendingPeopleName: {
    color: COLORS.textColor,
    fontSize: 12,
    textAlign: 'center',
    width: 60,
    marginTop: 10,
  },
  trendingPeopleImage: {
    width: 70,
    height: 70,
    borderRadius: 500,
  },
  posterImage: {
    height: 250,
    width: 150,
    borderRadius: 10,
  },
  movieTitle: {
    color: COLORS.textColor,
    textAlign: 'center',
    width: 150,
    marginTop: 5,
    fontSize: 14,
  },
  imageBg: {
    width: deviceWidth,
    height: 250,
  },
  detailsMovieTitle: {
    marginTop: -40,
    textAlign: 'center',
    color: COLORS.textColor,
    fontSize: 28,
  },
  linkContainer: {
    width: 45,
    borderRadius: 100,
    padding: 10,
    backgroundColor: COLORS.secondaryColor,
    marginLeft: 20,
    marginTop: -20,
  },
  overview: {
    color: COLORS.textColor,
    marginHorizontal: 10,
    textAlign: 'justify',
    fontSize: 16,
  },
  details: {
    color: COLORS.secondaryColor,
    fontSize: 15,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  genreContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.textColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  genre: {
    color: COLORS.textColor,
    fontSize: 16,
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginEnd: -35,
  },
  dividerLine: {
    height: 1,
    backgroundColor: COLORS.lightred,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  DrawerImage: {
    width: 110,
    height: 110,
    borderRadius: 100,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: COLORS.lightred,
  },
  DrawerHeader: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  white_bold: {
    fontWeight: 'bold',
    color: 'white',
  },
  seperator: {
    height: 2,
    color: 'white',
  },
  webview: {
    width: '100%',
    height: 300,
  },
  video: {
    width: Dimensions.get('window').width,
    height: 300,
  },
  icon: {
    height: 90,
    aspectRatio: 1,
  },
  linearGradient: {
    // flex: 1,
    margin: 50,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

export default Styles;
