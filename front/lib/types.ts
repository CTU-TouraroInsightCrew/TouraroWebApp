export type BaseProps = {
    children: React.ReactNode,
    className?: string,
};

export type NavLink = {
    label: string;
    href: string;
};

export type Locations = {
    id: number;
    location: string;
    duration: string;
    image: string;
    
}