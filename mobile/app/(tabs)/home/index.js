import {View, Text, ScrollView, SafeAreaView, StatusBar, Platform} from "react-native";
import { useEffect } from "react";
import { useRouter} from "expo-router";
import { useUser} from "../../../context/UserContext";
import UserWelcome from "../../../components/UserWelcome";
import Button from "../../../components/Button";
import {useTheme} from "../../../context/ThemeContext";
import DashboardSectionTitle from "../../../components/DashboardSectionTitle";
import DashboardModal from "../../../components/DashboardModal";


    export default function Home() {
    const {user, loadUserData} = useUser();
    const  shop = {
                        name: 'shop1',
                        url:  'https://www.zooplus.pl/checkout/login?notLoggedIn=true',
                        logo: require('../../../assets/icon.png'),
                        description: 'description'
                        }

    const {theme} = useTheme()

    const router = useRouter();

    useEffect(() => {
            loadUserData();

    }, []);

    return (

        <SafeAreaView
            className={`${theme==='dark' ? 'bg-darkBgPrimary' :'bg-white'} flex-1`}
            style={{
                flex: 1,
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
                      }}
        >

          <ScrollView
              automaticallyAdjustContentInsets={false}
          >
              {user ? (
                  <UserWelcome
                  firstName={user.firstName}
                  lastName={user.lastName}
                  bgColor={user.userColor || '#CCCCCC'}
                  text={`${user.firstName[0].toUpperCase()} ${user.lastName[0].toUpperCase()}`}
                  textClassName="text-white text-base"
                  className="w-9 h-9 my-0.5"
                  onPress={() => {router.push('/profile')}}
                  />
              ) :(
                  <Text>loading...</Text>
              )}

              <View>
                  <Button className="bg-bgPrimary" textClassName="text-white" text="Add new parrot" onPress={() => router.push('/home/addParrot')}/>
                  <Button className="bg-bgPrimary" textClassName="text-white" text="Edit parrot" onPress={() => router.push('/home/editParrot')}/>
              </View>

              <View >
                  <DashboardSectionTitle text={'Popular Pet Stores'}/>
                  <ScrollView
                  horizontal={true}
                  >
                    <DashboardModal
                        shop={shop}

                    />

                      <DashboardModal
                          shop={shop}

                      />



                  </ScrollView>

              </View>

          </ScrollView>
            </SafeAreaView>
    );
}
