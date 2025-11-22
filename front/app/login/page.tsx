import LoginForm from "@/components/form/login";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md">
                <LoginForm />
            </div>
        </div>
    );
}