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
            name: 'Daisy Sklep Zoologiczny',
            url: 'https://daisyzoologia.pl/nasze-sklepy/gdansk/',
            logo: require('../../../assets/icon.png'),
            description: 'Sklep oferuje szeroki asortyment karm, środków pielęgnacyjnych, suplementów diety oraz akcesoriów dla różnych zwierząt, w tym ptaków.',
            address: 'Stanisława Worcella 44A, 80-809 Gdańsk',
        },
        {
            name: 'Zoo Karina',
            url: 'https://zookarina.pl/',
            logo: require('../../../assets/icon.png'),
            description: 'Sieć sklepów zoologicznych oferująca karmy, przysmaki, zabawki oraz akcesoria dla zwierząt domowych, w tym ptaków.',
            address: 'Park Handlowy Matarnia, ul. Złota Karczma 26, 80-298 Gdańsk',
        },
        {
            name: 'Kakadu Zoo',
            url: 'https://kakadu.pl/',
            logo: require('../../../assets/icon.png'),
            description: 'Sklep zoologiczny oferujący pokarmy, terraria oraz akcesoria dla różnych zwierząt, w tym ptaków egzotycznych.',
            address: 'Galeria Bałtycka, al. Grunwaldzka 141, 80-264 Gdańsk',
        }
    ];

    const veterinarians = [
        {
            name: 'ANIMAL.MED Specjalistyczna Przychodnia Weterynaryjna',
            address: 'ul. Kartuska 249, 80-125 Gdańsk',
            contact: '+48 58 302 00 03',
            specialization: 'Leczenie, profilaktyka, stomatologia i chirurgia zwierząt egzotycznych, w tym ptaków.',
            url: 'https://animal.med.pl/',
            logo: require('../../../assets/icon.png'),
        },
        {
            name: 'EgzooVet lek. wet. Przemysław Łuczak',
            address: 'ul. Świętokrzyska 33A, 80-180 Gdańsk',
            contact: '+48 58 300 00 00',
            specialization: 'Kompleksowe leczenie zwierząt egzotycznych, w tym ptaków.',
            url: 'https://www.trojmiasto.pl/EgzooVet-P-Luczak-o73578.html',
            logo: require('../../../assets/icon.png'),
        },
        {
            name: 'Trójmiejska Klinika Weterynaryjna',
            address: 'ul. Morska 12, 80-001 Gdańsk',
            contact: '+48 58 300 00 01',
            specialization: 'Całodobowa opieka nad zwierzętami, w tym ptakami egzotycznymi.',
            url: 'https://www.trojmiasto.pl/Trojmiejska-Klinika-Weterynaryjna-o61889.html',
            logo: require('../../../assets/icon.png'),
        },
        {
            name: 'Weterynarz Przymorze',
            address: 'ul. Kołobrzeska 32B, 80-394 Gdańsk',
            contact: '+48 58 557 37 02',
            specialization: 'Leczenie psów, kotów oraz ptaków, gadów i płazów.',
            url: 'https://www.weterynarzprzymorze.pl/',
            logo: require('../../../assets/icon.png'),
        },
        {
            name: 'NewVet Chełm',
            address: 'ul. Cieszyńskiego 36, 80-809 Gdańsk',
            contact: '+48 58 300 00 02',
            specialization: 'Leczenie gadów, płazów oraz ptaków egzotycznych.',
            url: 'https://www.newvetchelm.pl/',
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
