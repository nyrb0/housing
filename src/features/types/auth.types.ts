export interface IUser {
    id: string;
    email: string;
    name: string;
    favorites?: string[];
}

export interface ILoginResponse {
    token: string;
    user: IUser;
}
