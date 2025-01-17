import {Text, View} from "react-native";
import Header from "../../components/Heading"
import CustomTextInput from "../../components/CustomTextInput";
import Button from "../../components/Button";
import {useRouter} from "expo-router";
import {useTheme} from "../../context/ThemeContext";
import {useContext, useState} from "react";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useUser} from "../../context/UserContext";
const loginSchema = Yup.object().shape({
    email: Yup.string().
        email("must be a valid email address")
        .required('First name is required'),
    password: Yup.string().
        required('Last name is required'),


})
//kom
export default function login() {
    const {saveUserData} = useUser()
    const router = useRouter();
    const { theme } = useTheme();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const [globalError, setGlobalError] = useState("");
    const [data, setData] = useState("");

    const handleChange = (field, value) => {
        setFormData({...formData, [field]: value});
    }
    // const saveUserDataInAsyncStorage =async (token, email, id) => {
    //     try {
    //         await AsyncStorage.multiSet([
    //             ["authToken", token],
    //             ["email", email],
    //             ["userId", id],
    //             ]
    //         )
    //     }
    //     catch (error) {
    //         console.log("error saving data:", error);
    //     }
    // }
    const handleSubmit = async () => {
        try {
            setErrors({});
            setSuccess("");
            setGlobalError("");
            await loginSchema.validate(formData, {abortEarly: false});

            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                })
            })
            if (!response.ok) {
                const errorData = await response.json()
                console.log(errorData)
                setGlobalError(errorData.message);
                throw new Error(errorData.message);

            }
            const data = await response.json();
            setData(data)
            console.log(data.token)
            setSuccess(`logged in successfully, welcome ${formData.email}.`);
            console.log('data before saving: ', data)
            await saveUserData(
                {
                    authToken:data.token,
                    email:data.email,
                    userId:data.userId,
                    firstName:data.firstName,
                    lastName:data.lastName,
                    userColor: data.profileBackgroundColor
                })
            setTimeout(()=>{
                router.push("/home");
            }, 2500)

        }
        catch(error) {
                if (error.name==="ValidationError") {
                    const formattedErrors = {}
                    error.inner.forEach(error => {
                        formattedErrors[error.path] = error.message;
                    })
                    setErrors(formattedErrors);
                }
                else {
                    setGlobalError(error.message);
                }
        }
    }


    return (
        <View className={` h-screen ${theme === 'dark' ? 'bg-darkBgPrimary' : 'bg-white'}`}>
            <View>
                <Header className="ml-10 py-4" text="Sign In" />
            </View>
            <View className={`flex justify-center items-center`}>
                <CustomTextInput
                    placeholder="email"
                    value={formData.email}
                    onChange={(value)=>handleChange("email", value)}
                    error={errors.email}
                    secureTextEntry={false}
                />
                {errors.email && (
                    <Text className={"text-red-500 text-sm mt-1"}>{errors.email}</Text>
                )}
                <CustomTextInput
                    placeholder="Password"
                    value={formData.password}
                    onChange={(value)=>handleChange("password", value)}
                    error={errors.password}
                    secureTextEntry={true}
                />
                {errors.password && (
                    <Text className={"text-red-500 text-sm mt-1"}>{errors.password}</Text>
                )}
                <Text className="font-medium text-xs text-textSecondary ml-60 py-4" onPress={() => router.push('/forgot-password')}>Forgot password?</Text>
                <Button
                    // onPress={() => router.push("/home")}
                    text="Log In"
                    className="bg-bgPrimary my-12"
                    textClassName="text-white"
                    onPress={handleSubmit}
                />
                {/*<Text className="text-textGray my-8">OR</Text>*/}
                {/*<Button*/}
                {/*    text="Login With Facebook"*/}
                {/*    className="bg-bgSecondary my-12"*/}
                {/*    textClassName="text-white"*/}
                {/*/>*/}
                {success && (<Text className={"text-green-500 text-sm mt-1"}>{success}</Text>)}
                {globalError && (<Text className={"text-red-500 text-sm mt-1"}>{globalError}</Text>)}
                {data && (
                    <Text className={"text-orange-50"} > {JSON.stringify(data.token)}</Text>
                )}

            </View>
        </View>
    )
}

