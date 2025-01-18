import {View, Image, Text} from "react-native";
import Button from "./Button";
import {Router, useRouter} from "expo-router";
import {useTheme} from "../context/ThemeContext";



export default function DashboardModal({shop, className }){
    const {name, url, logo, description} = shop
    const router = useRouter();
    const {theme} = useTheme()
    return (
        <View className={'border-2 mx-4 my-4 rounded-t-2xl rounded-b-2xl rounded min-w-[250px]'}>
            <View className={'flex-row justify-center mx-4'}>
                <Image
                    source={logo}
                    className="rounded-full"
                    style={{
                        width: 50,
                        height: 50,
                    }}
                />

                <Text className={`font-bold ${theme==='dark' ? 'text-white' : 'text-black '} `}>{name}</Text>
            </View>


         <View className={'flex items-center mt-2'}>
             <Button
                 text={'Visit Shop'}
                 className={'bg-bgPrimary w-[70%]'}
                 textClassName={'color-white'}
                 onPress={() => router.push('url')}
             />
         </View>

        </View>
    )
}