export interface ICampaign {
    id?: string;

    facebook_campaign_id: string;

    company_type: number;
    activity_type: number;
    category: number;

    header_image: string;
    wellcome_modal_image: string;
    facebook_add_image: string;

    client_example_1_company: string;
    client_example_2_company: string;
    client_example_3_company: string;

    client_example_1_phrase: string;
    client_example_2_phrase: string;
    client_example_3_phrase: string;
}
