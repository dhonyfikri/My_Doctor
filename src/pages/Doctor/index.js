import {child, get, getDatabase, ref} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  DummyDoctor1,
  DummyDoctor2,
  DummyDoctor3,
  JSONCategoryDoctor,
} from '../../assets';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor,
} from '../../components';
import {colors, fonts, showWarning} from '../../utils';

const Doctor = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [render, setRender] = useState(true);
  // const [refreshing, setRefreshing] = useState(false);
  const [news, setNews] = useState([]);
  const [categoryDoctor, setCategoryDoctor] = useState([]);

  const onRefresh = () => {
    // setRefreshing(true);

    // wait(2000).then(() => {
    //   setRefreshing(false);
    // });

    dispatch({type: 'SET_BASIC_LOADING', value: true});
    getOnlineCategoryDoctor()
      .then(res => {
        setCategoryDoctor(res);
        dispatch({type: 'SET_BASIC_LOADING', value: false});
      })
      .catch(err => {
        showWarning(err.message);
        dispatch({type: 'SET_BASIC_LOADING', value: false});
      });
    getOnlineNews()
      .then(res => {
        setNews(res);
        // setRefreshing(false);
        dispatch({type: 'SET_BASIC_LOADING', value: false});
      })
      .catch(err => {
        console.log(err.message);
        showWarning(err.message);
        // setRefreshing(false);
        dispatch({type: 'SET_BASIC_LOADING', value: false});
      });
  };

  const getOnlineNews = () => {
    // perhatikan apabila membuat promise, hanya lakukan resolve atau reject. jangan console.log maupun update UI
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const dbRef = ref(db);
      // const presenceRef = ref(db, 'disconnectmessage');
      get(child(dbRef, 'news/'))
        .then(snapshot => {
          if (snapshot.exists()) {
            resolve(snapshot.val());
          } else {
            reject({message: 'Failed get online news data (404)'});
          }
        })
        .catch(error => {
          reject({message: 'Failed get online news data (500)'});
        });
      // onDisconnect(presenceRef)
      //   .remove()
      //   .catch(err => {
      //     if (err) {
      //       // console.error('could not establish onDisconnect event', err);
      //       showWarning('Bad internet connection');
      //     }
      //   });
    });
  };

  const getOnlineCategoryDoctor = () => {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      get(child(ref(db), 'category_doctor/'))
        .then(snapshot => {
          if (snapshot.exists()) {
            resolve(snapshot.val());
          } else {
            reject({message: 'Failed get online doctor category data (404)'});
          }
        })
        .catch(error => {
          reject({message: 'Failed get online doctor category data (500)'});
        });
    });
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    if (route.params?.onResume) {
      console.log(
        'on resume update in Doctor from ',
        route.params?.onResume.message,
      );
      // setRender(true);
      onRefresh();
    }
  }, [route.params?.onResume]);

  useEffect(() => {
    // getOnlineData()
    //   .then(res => {
    //     setNews(res);
    //   })
    //   .catch(err => {
    //     showWarning(err.message);
    //   });
    onRefresh();
  }, []);

  return (
    <View style={styles.wrapperScrollPage}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          // <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }>
        <View style={styles.page}>
          <HomeProfile
            onPress={() => navigation.navigate('UserProfile')}
            reRender={{render: true}}
          />
          <Text style={styles.welcome}>
            Mau konsultasi dengan siapa hari ini?
          </Text>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={16} />
                {/* {JSONCategoryDoctor.data.map(item => {
                    return (
                      <DoctorCategory
                        category={item.category}
                        key={item.id}
                        onPress={() => navigation.navigate('ChooseDoctor')}
                      />
                    );
                  })} */}
                {categoryDoctor.map(item => {
                  return (
                    <DoctorCategory
                      category={item.category}
                      key={item.id}
                      onPress={() => navigation.navigate('ChooseDoctor')}
                    />
                  );
                })}
                <Gap width={6} />
              </View>
            </ScrollView>
          </View>
          <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
          <RatedDoctor
            avatar={DummyDoctor1}
            name="Alexa Rachel"
            desc="Pediatrician"
            onPress={() => navigation.navigate('DoctorProfile')}
          />
          <RatedDoctor
            avatar={DummyDoctor2}
            name="Sunny Frank"
            desc="Dentist"
            onPress={() => navigation.navigate('DoctorProfile')}
          />
          <RatedDoctor
            avatar={DummyDoctor3}
            name="Poe Minn"
            desc="Podiatrist"
            onPress={() => navigation.navigate('DoctorProfile')}
          />
          <Text style={styles.sectionLabel}>Good News</Text>
          {news.map(item => {
            return (
              <NewsItem
                key={item.id}
                title={item.title}
                date={item.date}
                cover={item.image}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  wrapperScrollPage: {
    flex: 1,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
  },
  page: {
    padding: 16,
  },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  category: {
    flexDirection: 'row',
  },
  wrapperScroll: {
    marginHorizontal: -16,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});
