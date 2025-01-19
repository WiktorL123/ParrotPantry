import {View, Text, ScrollView, SafeAreaView, StatusBar, Platform, TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
import {useRouter} from "expo-router";
import {useUser} from "../../../context/UserContext";
import UserWelcome from "../../../components/UserWelcome";
import Button from "../../../components/Button";
import {useTheme} from "../../../context/ThemeContext";
import DashboardSectionTitle from "../../../components/DashboardSectionTitle";
import DashboardModal from "../../../components/DashboardModal";
import ParrotDashboardModal from "../../../components/ParrotDashboardModal";
import moment from "moment";


export default function Home() {
    const {user, loadUserData} = useUser();
    const [showMore, setShowMore] = useState(false);

    const parrots = [
        {
            name: "Rio",
            species: "Macaw",
            age: 2,
            wingspan: 30,
            food: "seeds",
            lastVaccination: moment("2025-01-01").format("D MMMM YYYY")
        },
        {
            name: "Coco",
            species: "Cockatiel",
            age: 1,
            wingspan: 20,
            food: "fruits",
            lastVaccination: moment("2024-12-01").format("D MMMM YYYY")
        },
        {
            name: "Sunny",
            species: "Sun Conure",
            age: 3,
            wingspan: 25,
            food: "nuts",
            lastVaccination: moment("2023-11-01").format("D MMMM YYYY")
        },
        {
            name: "Kiwi",
            species: "Budgie",
            age: 1,
            wingspan: 15,
            food: "vegetables",
            lastVaccination: moment("2024-10-01").format("D MMMM YYYY")
        }
    ];

    const shops = [
        {
            name: 'zooplus',
            url: 'https://www.zooplus.pl/checkout/login?notLoggedIn=true',
            logo: require('../../../assets/icon.png'),
            description: 'Description for Shop 1'
        },
        {
            name: 'PetStore',
            url: 'https://www.petstore.com',
            logo: require('../../../assets/icon.png'),
            description: 'Description for Shop 2'
        },
        {
            name: 'Animal World',
            url: 'https://www.animalworld.com',
            logo: require('../../../assets/icon.png'),
            description: 'Description for Shop 3'
        }
    ];

    const veterinarians = [
        {
            name: 'Veterzynarz Przymorze',
            address: 'Street 1, City',
            contact: '+12345678900',
            specialization: 'Exotic birds',
            url: 'https://nordvet.pl/',
            logo: require('../../../assets/icon.png'),
        },
        {
            name: 'Exotic Vet',
            address: 'Street 2, City',
            contact: '+98765432100',
            specialization: 'Birds and reptiles',
            url: 'https://exoticvet.com',
            logo: require('../../../assets/icon.png'),
        },
        {
            name: 'Avian Care',
            address: 'Street 3, City',
            contact: '+1234509876',
            specialization: 'Avian specialists',
            url: 'https://avian.com',
            logo: require('../../../assets/icon.png'),
        }
    ];

    const {theme} = useTheme();
    const router = useRouter();

    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <SafeAreaView
            className={`${theme === 'dark' ? 'bg-darkBgPrimary' : 'bg-white'} flex-1`}
            style={{
                flex: 1,
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }}
        >
            <ScrollView automaticallyAdjustContentInsets={false}>
                {user ? (
                    <UserWelcome
                        firstName={user.firstName}
                        lastName={user.lastName}
                        bgColor={user.userColor || '#CCCCCC'}
                        text={`${user.firstName[0].toUpperCase()} ${user.lastName[0].toUpperCase()}`}
                        textClassName="text-white text-base"
                        className="w-9 h-9 my-2/3"
                        onPress={() => {
                            router.push('/profile');
                        }}
                    />
                ) : (
                    <Text>loading...</Text>
                )}

                <View className={'my-8'}>
                    <View className={'flex-row justify-between my-4 '}>
                        <DashboardSectionTitle text={'Your Parrots'} className={'ml-10'}/>
                        <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                            <Text className="text-textPrimary mt-1 mr-10">{showMore ? 'Hide' : 'Show More'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {parrots.slice(0, showMore ? parrots.length : 2).map((parrot, index) => (
                            <ParrotDashboardModal key={index} data={parrot} onAddNew={() => router.push('/home/addParrot')}/>
                        ))}
                    </View>

                    <Button
                        text="Add New Parrot"
                        className="bg-bgPrimary m-auto"
                        textClassName="text-white"
                        onPress={() => router.push('/home/addParrot')}
                    />
                </View>

                <View>
                    <DashboardSectionTitle text={'Popular Pet Stores'} className={'ml-10 my-4'}/>
                    <ScrollView horizontal={true}>
                        {shops.map((shop, index) => (
                            <DashboardModal key={index} data={shop}/>
                        ))}
                    </ScrollView>
                </View>

                <View>
                    <DashboardSectionTitle text={'Popular Veterinarians'} className={'ml-10 my-4'}/>
                    <ScrollView horizontal={true}>
                        {veterinarians.map((vet, index) => (
                            <DashboardModal key={index} data={vet}/>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
