export interface Actor {
    _id: string;
    fullname: string;
    profile_picture: {
        public_id: string;
        url: string;
    };
}

export interface Notification {
    _id: string;
    actor: Actor;
    entity: Actor;
    onModel: string;
    timestamp: string;
    type: string;
}
