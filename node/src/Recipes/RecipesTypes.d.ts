interface Recipe {
    id: number;
    version: number;
    is_public: boolean;
    created_at: string;
    name: string;
    description: string;
    steps: string;
    owner_id: number;
}

export { Recipe };