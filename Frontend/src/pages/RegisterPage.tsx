import { useState, useEffect, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Eye, 
  EyeOff, 
  Loader2, 
  ChevronRight, 
  ChevronLeft, 
  Tractor, 
  Store, 
  Upload, 
  CheckCircle,
  Mail,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Card, CardContent } from "../components/ui/card";
import { registerSchema, type RegisterFormData } from "../lib/validations/register";
import axios from "axios";
import { Country, State, IState } from "country-state-city";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { GoogleRoleModal } from "../components/GoogleRoleModal";

// User Type Selection Component with Google Auth option
function UserTypeSelection({ 
  selectedType, 
  onSelect,
  onGoogleSuccess
}: { 
  selectedType: string; 
  onSelect: (type: string) => void;
  onGoogleSuccess: (credentialResponse: any) => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">{t("userType.title")}</h2>
        <p className="text-muted-foreground">{t("userType.subtitle")}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card
            className={`cursor-pointer transition-colors border ${
              selectedType === "farmer" ? "border-[#1E3F2D] bg-[#EEF4EF]" : "border-[#E8E4DA] bg-[#FAF8F3] hover:border-[#1E3F2D]/50"
            }`}
            onClick={() => onSelect("farmer")}
          >
            <CardContent className="p-6 text-center">
              <div className="mb-4 mx-auto w-16 h-16 rounded-2xl bg-[#FAF8F3] border border-[#E8E4DA] flex items-center justify-center">
                <Tractor className={`h-8 w-8 ${selectedType === "farmer" ? "text-[#1E3F2D]" : "text-[#7F8B82]"}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1A261D]">{t("userType.farmer.title")}</h3>
              <p className="text-sm text-[#5C6B5F]">
                {t("userType.farmer.description")}
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card
            className={`cursor-pointer transition-colors border ${
              selectedType === "buyer" ? "border-[#1E3F2D] bg-[#EEF4EF]" : "border-[#E8E4DA] bg-[#FAF8F3] hover:border-[#1E3F2D]/50"
            }`}
            onClick={() => onSelect("buyer")}
          >
            <CardContent className="p-6 text-center">
              <div className="mb-4 mx-auto w-16 h-16 rounded-2xl bg-[#FAF8F3] border border-[#E8E4DA] flex items-center justify-center">
                <Store className={`h-8 w-8 ${selectedType === "buyer" ? "text-[#1E3F2D]" : "text-[#7F8B82]"}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1A261D]">{t("userType.buyer.title")}</h3>
              <p className="text-sm text-[#5C6B5F]">
                {t("userType.buyer.description")}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Google Registration Option */}
      <div className="mt-8 pt-6 border-t border-[#E8E4DA] flex flex-col items-center">
        <span className="text-xs uppercase tracking-wider font-semibold text-[#7F8B82] mb-3">
          Or Register Instantly With Google
        </span>
        <GoogleLogin
          onSuccess={onGoogleSuccess}
          onError={() => toast.error("Google Registration was unsuccessful")}
          theme="outline"
          size="large"
          text="signup_with"
          shape="rectangular"
        />
        <span className="text-[11px] text-[#7F8B82] mt-2">
          (No additional OTP required - Google verifies your email)
        </span>
      </div>
    </div>
  );
}

// Personal Info Component
function PersonalInfo({ form }: { form: ReturnType<typeof useForm<RegisterFormData>> }) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const { register, formState: { errors } } = form;
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">{t("personalInfo.title")}</h2>
        <p className="text-muted-foreground">{t("personalInfo.subtitle")}</p>
      </div>
      <div className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">{t("personalInfo.firstName")}</Label>
            <Input
              id="firstName"
              {...register("firstName")}
              className={errors.firstName ? "border-red-500" : ""}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">{t("personalInfo.lastName")}</Label>
            <Input
              id="lastName"
              {...register("lastName")}
              className={errors.lastName ? "border-red-500" : ""}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">{t("personalInfo.username")}</Label>
          <Input
            id="username"
            {...register("username")}
            className={errors.username ? "border-red-500" : ""}
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">{t("personalInfo.password")}</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={errors.password ? "border-red-500" : ""}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Contact Info Component
function ContactInfo({ form }: { form: ReturnType<typeof useForm<RegisterFormData>> }) {
  const { t } = useTranslation();
  const { register, formState: { errors }, setValue, watch } = form;
  const [states, setStates] = useState<IState[]>([]);
  const selectedCountry = watch("country");

  useEffect(() => {
    if (selectedCountry) {
      const countryStates = State.getStatesOfCountry(selectedCountry);
      setStates(countryStates);
      setValue("state", "");
    } else {
      setStates([]);
    }
  }, [selectedCountry, setValue]);

  const countries = Country.getAllCountries();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">{t("contactInfo.title")}</h2>
        <p className="text-muted-foreground">{t("contactInfo.subtitle")}</p>
      </div>
      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">{t("contactInfo.email")}</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{t("contactInfo.phone")}</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">{t("contactInfo.country")}</Label>
            <Select value={selectedCountry || ""} onValueChange={(value) => setValue("country", value)}>
              <SelectTrigger className={errors.country ? "border-red-500" : ""}>
                <SelectValue placeholder={t("contactInfo.selectCountry")} />
              </SelectTrigger>
              <SelectContent position="popper" side="bottom" align="start" className="max-h-[200px] overflow-y-auto">
                {countries.map((country) => (
                  <SelectItem key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">{t("contactInfo.state")}</Label>
            <Select value={watch("state") || ""} onValueChange={(value) => setValue("state", value)} disabled={!selectedCountry}>
              <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                <SelectValue placeholder={t("contactInfo.selectState")} />
              </SelectTrigger>
              <SelectContent position="popper" side="bottom" align="start" className="max-h-[200px] overflow-y-auto">
                {states.length > 0 ? (
                  states.map((state) => (
                    <SelectItem key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </SelectItem>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 px-2 py-1">{t("contactInfo.noStates")}</p>
                )}
              </SelectContent>
            </Select>
            {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// Document Upload Component
function DocumentUpload({ form }: { form: ReturnType<typeof useForm<RegisterFormData>> }) {
  const { t } = useTranslation();
  const { register, formState: { errors }, setValue } = form;
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: "proofDocument" | "profilePhoto"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(field, file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">{t("documentUpload.title")}</h2>
        <p className="text-muted-foreground">{t("documentUpload.subtitle")}</p>
      </div>
      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="documentNo">{t("documentUpload.documentNo")}</Label>
          <Input
            id="documentNo"
            {...register("documentNo")}
            className={errors.documentNo ? "border-red-500" : ""}
          />
          {errors.documentNo && (
            <p className="text-sm text-red-500">{errors.documentNo.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="proofDocument">{t("documentUpload.proofDocument")}</Label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md hover:border-green-400 transition-colors">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="proofDocument"
                  className="relative cursor-pointer rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                >
                  <span>{t("documentUpload.uploadText")}</span>
                  <Input
                    id="proofDocument"
                    type="file"
                    className="sr-only"
                    onChange={(e) => handleFileChange(e, "proofDocument")}
                  />
                </label>
                <p className="pl-1">{t("documentUpload.dragDropText")}</p>
              </div>
              <p className="text-xs text-gray-500">{t("documentUpload.fileSize.document")}</p>
            </div>
          </div>
          {errors.proofDocument && errors.proofDocument.message && (
            <p className="text-sm text-red-500">{errors.proofDocument.message.toString()}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="profilePhoto">{t("documentUpload.profilePhoto")}</Label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md hover:border-green-400 transition-colors">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="profilePhoto"
                  className="relative cursor-pointer rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                >
                  <span>{t("documentUpload.uploadText")}</span>
                  <Input
                    id="profilePhoto"
                    type="file"
                    className="sr-only"
                    onChange={(e) => handleFileChange(e, "profilePhoto")}
                  />
                </label>
                <p className="pl-1">{t("documentUpload.dragDropText")}</p>
              </div>
              <p className="text-xs text-gray-500">{t("documentUpload.fileSize.photo")}</p>
            </div>
          </div>
          {errors.profilePhoto && (
            <p className="text-sm text-red-500">{errors.profilePhoto.message?.toString()}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// NEW: Email OTP Verification Component
function OTPVerificationStep({
  email,
  otpValue,
  onOtpChange,
  onResendOtp,
  isSendingOtp,
  otpError,
}: {
  email: string;
  otpValue: string;
  onOtpChange: (val: string) => void;
  onResendOtp: () => void;
  isSendingOtp: boolean;
  otpError: string;
}) {
  return (
    <div className="space-y-6 text-center">
      <div className="w-16 h-16 bg-[#EEF4EF] rounded-full flex items-center justify-center mx-auto text-[#1E3F2D] border border-[#D5E4D8]">
        <Mail className="w-8 h-8" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-[#1A261D] mb-1">Verify Your Email Address</h2>
        <p className="text-xs sm:text-sm text-[#5C6B5F]">
          We have dispatched a 6-digit verification code to <strong className="text-[#1A261D]">{email}</strong>.
        </p>
      </div>

      <div className="max-w-xs mx-auto space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C6B5F]">
          Enter 6-Digit OTP Code
        </label>
        <input
          type="text"
          maxLength={6}
          value={otpValue}
          onChange={(e) => onOtpChange(e.target.value.replace(/\D/g, ""))}
          placeholder="e.g. 542109"
          className="w-full text-center tracking-[8px] font-mono text-2xl font-bold py-3 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-white focus:border-[#1E3F2D] outline-none text-[#1A261D]"
        />

        {otpError && (
          <p className="text-xs text-rose-600 font-semibold">{otpError}</p>
        )}

        <div className="pt-2">
          <button
            type="button"
            onClick={onResendOtp}
            disabled={isSendingOtp}
            className="text-xs font-semibold text-[#1E3F2D] hover:underline flex items-center justify-center gap-1.5 mx-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSendingOtp ? "animate-spin" : ""}`} />
            {isSendingOtp ? "Sending New Code..." : "Resend Verification Code"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Registration Complete Component
function RegistrationComplete({ userType }: { userType: string }) {
  const { t } = useTranslation();
  return (
    <div className="text-center py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
      </motion.div>
      <h2 className="text-2xl font-bold mb-4">{t("complete.title")}</h2>
      <p className="text-muted-foreground mb-8">
        {userType === "farmer" ? t("complete.farmerMessage") : t("complete.buyerMessage")}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild className="bg-green-600 hover:bg-green-700">
          <Link to="/login">{t("complete.dashboard")}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/marketplace">
            {userType === "farmer"
              ? t("complete.marketplace.farmer")
              : t("complete.marketplace.buyer")}
          </Link>
        </Button>
      </div>
    </div>
  );
}

// Main RegisterPage Component
export default function RegisterPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const [pendingGoogleToken, setPendingGoogleToken] = useState("");
  const [pendingGoogleInfo, setPendingGoogleInfo] = useState<{ name: string; email: string }>({ name: "", email: "" });

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      userType: "farmer",
    }
  });

  const { handleSubmit, trigger, watch, setValue, getValues } = form;
  const userType = watch("userType");
  const email = watch("email");

  // Step 5 is OTP verification, Step 6 is Complete
  const sendOtpRequest = async () => {
    setIsSendingOtp(true);
    setOtpError("");
    try {
      const res = await axios.post("http://localhost:5000/api/user/send-otp", {
        email: getValues("email"),
      });
      toast.success(res.data?.message || "Verification code dispatched to your email!");
      return true;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to dispatch verification code";
      setOtpError(msg);
      toast.error(msg);
      return false;
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setIsSubmitting(true);
      const res = await axios.post("http://localhost:5000/api/user/google-auth", {
        credential: credentialResponse.credential,
        userType: userType,
      });

      if (res.data.requiresRoleSelection) {
        setPendingGoogleToken(credentialResponse.credential);
        setPendingGoogleInfo({
          name: res.data.googleName || "",
          email: res.data.googleEmail || "",
        });
        setGoogleModalOpen(true);
        return;
      }

      toast.success(res.data?.message || "Google registration successful!");
      if (res.data.token && res.data.role) {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("userRole", res.data.role);
        window.location.href = `http://localhost:5174/${res.data.role}/${encodeURIComponent(res.data.token)}`;
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Google authentication failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRoleSelected = async (chosenRole: "farmer" | "buyer") => {
    try {
      setIsSubmitting(true);
      const res = await axios.post("http://localhost:5000/api/user/google-auth", {
        credential: pendingGoogleToken,
        userType: chosenRole,
      });

      toast.success("Welcome to FarmBridge! Account registered successfully.");
      setGoogleModalOpen(false);
      if (res.data.token && res.data.role) {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("userRole", res.data.role);
        window.location.href = `http://localhost:5174/${res.data.role}/${encodeURIComponent(res.data.token)}`;
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Google registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    if (!otpValue || otpValue.length < 6) {
      setOtpError("Please enter the 6-digit OTP sent to your email");
      return;
    }

    setIsSubmitting(true);
    setOtpError("");
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });
    formData.append("otp", otpValue);

    try {
      const response = await axios.post("http://localhost:5000/api/user/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Account registered and activated successfully!");
      if (response.data.token && response.data.userType) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userRole", response.data.userType);
        setStep(6); // Show complete screen
      } else {
        alert("Registration completed. Please sign in.");
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || "Registration failed. Please check your details.";
      setOtpError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepFields = (currentStep: number): Array<keyof RegisterFormData> => {
    switch (currentStep) {
      case 1:
        return ["userType"];
      case 2:
        return ["firstName", "lastName", "username", "password"];
      case 3:
        return ["email", "phone", "country", "state"];
      case 4:
        return ["documentNo", "proofDocument", "profilePhoto"];
      default:
        return [];
    }
  };

  const nextStep = async () => {
    if (step < 4) {
      const fields = getStepFields(step);
      const isValid = await trigger(fields);
      if (isValid) {
        setStep((s) => s + 1);
      }
    } else if (step === 4) {
      const fields = getStepFields(4);
      const isValid = await trigger(fields);
      if (isValid) {
        const otpSent = await sendOtpRequest();
        if (otpSent) {
          setStep(5); // Move to OTP step
        }
      }
    }
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-[#FBF9F5] font-sans pt-28 pb-20 px-4 text-[#1A261D]">
      <Card className="max-w-3xl mx-auto bg-white border border-[#E8E4DA] shadow-soft rounded-2xl">
        <CardContent className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && (
                <UserTypeSelection
                  selectedType={userType}
                  onSelect={(type) => setValue("userType", type as "farmer" | "buyer")}
                  onGoogleSuccess={handleGoogleSuccess}
                />
              )}
              {step === 2 && <PersonalInfo form={form} />}
              {step === 3 && <ContactInfo form={form} />}
              {step === 4 && <DocumentUpload form={form} />}
              {step === 5 && (
                <OTPVerificationStep
                  email={email}
                  otpValue={otpValue}
                  onOtpChange={setOtpValue}
                  onResendOtp={sendOtpRequest}
                  isSendingOtp={isSendingOtp}
                  otpError={otpError}
                />
              )}
              {step === 6 && <RegistrationComplete userType={userType} />}
            </motion.div>
          </AnimatePresence>

          {step < 6 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-[#E8E4DA]">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="gap-2 border-[#E8E4DA] bg-[#FAF8F3] hover:bg-[#F2EDE2] text-[#1A261D]"
                >
                  <ChevronLeft className="h-4 w-4" /> {t("navigation.previous")}
                </Button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={isSendingOtp}
                  className="bg-[#1E3F2D] hover:bg-[#18392B] text-[#FAF8F3] gap-2 shadow-soft-xs"
                >
                  {isSendingOtp ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Dispatching OTP...
                    </>
                  ) : (
                    <>
                      {step === 4 ? "Verify Email with OTP" : t("navigation.next")}
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-[#1E3F2D] hover:bg-[#18392B] text-[#FAF8F3] gap-2 shadow-soft-xs"
                  disabled={isSubmitting || otpValue.length < 6}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Verifying & Activating Account...
                    </>
                  ) : (
                    <>
                      Verify OTP & Complete Registration
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Role Selection Modal for 1st-time Google users */}
      <GoogleRoleModal
        isOpen={googleModalOpen}
        googleName={pendingGoogleInfo.name}
        googleEmail={pendingGoogleInfo.email}
        onSelectRole={handleRoleSelected}
        onCancel={() => setGoogleModalOpen(false)}
        isLoading={isSubmitting}
      />
    </form>
  );
}
