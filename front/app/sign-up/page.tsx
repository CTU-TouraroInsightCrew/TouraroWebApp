import SignUpForm from "@/components/form/sign-up";

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md">
                <SignUpForm />
            </div>
        </div>
    );
}