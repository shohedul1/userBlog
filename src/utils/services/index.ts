export interface UserProfile {
    _id: string;
    name: string;
    email: string;
    password: string;
    designation: string;
    age: string;
    location: string;
    about: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}


export const fetchUserProfile = async (id: string): Promise<any> => {
    try {
        const res = await fetch(`/api/user/${id}`, {
            cache: "no-store"
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            console.error("Failed to fetch user profile:", res.statusText);
            return null; // Return null or throw an error based on your error handling strategy
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null; // Return null or throw an error based on your error handling strategy
    }
}
