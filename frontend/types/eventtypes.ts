type Event = {
    title: string;
    postedById: string;
    postedByName: string;
    startTime: string;
    endTime: string;
    coordinates: number[];
    locationName: string;
    description: string;
    image: {
        public_id: string;
        url: string;
    };
    category: string;
};

export type { Event };
