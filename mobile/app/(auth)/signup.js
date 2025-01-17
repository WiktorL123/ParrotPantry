
import {ScrollView, Text, View} from "react-native";

import Header from "../../components/Heading"
import AddColorButton from "../../components/AddColorButton";
import CustomTextInput from "../../components/CustomTextInput";
import {useTheme} from "../../context/ThemeContext";
import Button from "../../components/Button";
import * as Yup from "yup";
import {useState} from "react";
import {ColorPicker} from "../../components/ColorPicker";

const signupSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    username: Yup.string().required('Username is required')
        .min(3, "username must be at least 3 characters long"),
    email: Yup.string()
        .email("must be an valid email address")
        .required('Email is required'),
    password: Yup.string()
        .required("Password is required")
        .min(6, "password must be at least 6 characters long"),
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
        selectedColor: ""
    })
    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState("")
    const [globalError, setGlobalError] = useState("")
    const [showColorPicker, setShowColorPicker] = useState(false)
    const handleChange = (field, value) => {
        setFormData({...formData, [field]: value})
    }
    const handleChangeColor = () =>{
        setShowColorPicker((prev) => !prev)
    }

    const handleSubmit = async () => {
        try {
            setErrors({})
            setSuccess("")
            setGlobalError("")
            await signupSchema.validate(formData, {abortEarly: false})
            console.log(JSON.stringify(formData))
            const response = await fetch('http://localhost:3000/users/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    profileBackgroundColor: formData.selectedColor

                })
            })
            if (!response.ok) {
                const errorData = await response.json()
                console.log(errorData)
                throw new Error(errorData.message || "Register failed.")
            }
                setSuccess(`success, welcome, ${formData.username}`)
            console.log(success)
            console.log(formData)
        }
        catch (err) {
            if (err.name==="ValidationError") {
                const formattedErrors = {}
                err.inner.forEach(error => {
                    formattedErrors[error.path] = error.message
                })
                setErrors(formattedErrors)
            }
            else {
                setGlobalError(err.message)
            }

        }
    }

    return (
        <ScrollView className={`${theme==='dark' ? 'bg-darkBgPrimary' :'bg-white'} h-screen`}>



            <View>
                <Header className="ml-10 py-4" text="Create new account" />
            </View>
            <View className="flex justify-center items-center">
                <AddColorButton
                    className="bg-placeholder"
                    textClassName="text-white"
                    color={formData.selectedColor}
                    onPress={()=>handleChangeColor()}/>
                {showColorPicker && (
                    <ColorPicker
                    selectedColor={formData.selectedColor}
                    onSelect={(color)=>{
                        handleChange('selectedColor', color)
                        setShowColorPicker(false)
                    }}
                    />
                )}
                <CustomTextInput
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(value)=>handleChange("firstName", value)}
                    error = {errors.firstName}
                    secureTextEntry={false}
                />
                {errors.firstName && (
                    <Text className="text-red-500 text-sm mt-1">{errors.firstName}</Text>
                )}
                <CustomTextInput
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(value)=>handleChange("lastName", value)}
                    error = {errors.lastName}
                    secureTextEntry={false}
                />

                {errors.lastName && (<Text className="text-red-500 text-sm mt-1">{errors.lastName}</Text>)}

                <CustomTextInput
                    placeholder="Username"
                    value={formData.username}
                    onChange={(value)=>handleChange("username", value)}
                    error = {errors.username}
                    secureTextEntry={false}
                />
                {errors.username && (<Text className="text-red-500 text-sm mt-1">{errors.username}</Text>)}

                <CustomTextInput
                    placeholder="E-mail Address"
                    value={formData.email}
                    onChange={(value)=>handleChange("email", value)}
                    error = {errors.email}
                    secureTextEntry={false}
                />

                {errors.email && (<Text className="text-red-500 text-sm mt-1">{errors.email}</Text>)}

                <CustomTextInput
                    placeholder="Password"
                    value={formData.password}
                    onChange={(value)=>handleChange("password", value)}
                    error = {errors.password}
                    secureTextEntry={true}
                />

                {errors.confirmPassword && (<Text className="text-red-500 text-sm mt-1">{errors.confirmPassword}</Text>)}

                <CustomTextInput
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(value)=>handleChange("confirmPassword", value)}
                    error = {errors.confirmPassword}
                    secureTextEntry={true}
                />

                {errors.confirmPassword && (<Text className="text-red-500 text-sm mt-0.5">{errors.confirmPassword}</Text>)}

                <Button text="Sign Up"
                        className='bg-bgPrimary my-16'
                        textClassName="text-white"
                        onPress={handleSubmit}
                />
                {success && (<Text className="text-green-500 text-sm mt-1">{success}</Text>)}
                {globalError && (<Text className="text-red-600 text-lg mt-1">{globalError}</Text>)}
            </View>

        </ScrollView>
    )
}