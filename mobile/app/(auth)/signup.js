import { Text, View} from "react-native";
import Header from "../../components/Heading"
import AddPhotoButton from "../../components/AddPhotoButton";
import CustomTextInput from "../../components/CustomTextInput";
import {useTheme} from "../../context/ThemeContext";
import Button from "../../components/Button";
import * as Yup from "yup";
import {useState} from "react";
import Toast from "react-native-toast-message";
const signupSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    username: Yup.string().required('Username is required')
        .min(3, "username must be at least 3 characters long"),
    email: Yup.string()
        .email("must be an valid email address")
        .required('Email is required'),
    password: Yup.string()
        .required("Password is required").
        min(6, "password must be at least 6 characters long"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
})

export default function signup() {

    const { theme } = useTheme()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [errors, setErrors] = useState({})

    const handleChange = (field, value) => {
        setFormData({...formData, [field]: value})
    }

    const handleSubmit = async () => {
        try {
            setErrors({})
            await signupSchema.validate(formData, {abortEarly: false})
            Toast.show({
                type: "success",
                text1: "Sign up successfully",
                text2: "You can log in now",

            })
        }
        catch (validationError) {
            const formattedErrors = {}
            validationError.inner.forEach(error => {
                formattedErrors[error.path] = error.message
            })
            setErrors(formattedErrors)
        }
    }

    return (
        <View className={`${theme==='dark' ? 'bg-darkBgPrimary' :'bg-white'} h-screen`}>
            <View>
                <Header className="ml-10 py-4" text="Create new account" />
            </View>
            <View className="flex justify-center items-center">
                <AddPhotoButton className="bg-placeholder" textClassName="text-white" />
                <CustomTextInput
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(value)=>handleChange("firstName", value)}
                    error = {errors.firstName}
                />
                {errors.firstName && (
                    <Text className="text-red-500 text-sm mt-1">{errors.firstName}</Text>
                )}
                <CustomTextInput
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(value)=>handleChange("lastName", value)}
                    error = {errors.lastName}
                />

                {errors.lastName && (<Text className="text-red-500 text-sm mt-1">{errors.lastName}</Text>)}

                <CustomTextInput
                    placeholder="Username"
                    value={formData.username}
                    onChange={(value)=>handleChange("username", value)}
                    error = {errors.username}
                />
                {errors.username && (<Text className="text-red-500 text-sm mt-1">{errors.username}</Text>)}

                <CustomTextInput
                    placeholder="E-mail Address"
                    value={formData.email}
                    onChange={(value)=>handleChange("email", value)}
                    error = {errors.email}
                />

                {errors.email && (<Text className="text-red-500 text-sm mt-1">{errors.email}</Text>)}

                <CustomTextInput
                    placeholder="Password"
                    value={formData.password}
                    onChange={(value)=>handleChange("password", value)}
                    error = {errors.password}
                />

                {errors.confirmPassword && (<Text className="text-red-500 text-sm mt-1">{errors.confirmPassword}</Text>)}

                <CustomTextInput
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(value)=>handleChange("confirmPassword", value)}
                    error = {errors.confirmPassword}
                />

                {errors.confirmPassword && (<Text className="text-red-500 text-sm mt-1">{errors.confirmPassword}</Text>)}

                <Button text="Sign Up" className='bg-bgPrimary my-16' textClassName="text-white" onPress={handleSubmit}/>
            </View>
        </View>
    )
}