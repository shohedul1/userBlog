export interface UserProfile {
    _id: string;
    name: string;
    email: string;
    password: string;
    designation: string;
    age: string;
    location: string;
    country: string;
    about: string;
    avatar: { url: string, id: string };
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface UserPost {
    _id: string;
    title: string;
    description: string;
    brand: string;
    number: string;
    age?: string;
    category: string;
    quantity: string;
    image?: object;
    authorId: string;
    createdAt: string;
    updatedAt: string;
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

//all user get
export async function fetchUserpost() {
    const res = await fetch('/api/userpost', {
        cache: "no-store"
    });
    if (res.ok) {
        return res.json();
    }

}


//userpost single data get services
export const fetchSingleUserpost = async (id: string): Promise<any> => {
    try {
        const res = await fetch(`/api/userpost/${id}`, {
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

