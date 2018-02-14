import * as mongoose from 'mongoose';
import { ICampaign } from '../../src/app/shared/models/ICampaign';

export interface CampaignInterface extends ICampaign, mongoose.Document {
    _id: string;
}

export const CampaignSchema = new mongoose.Schema({
    facebook_campaign_id: String,

    company_type: Number,
    activity_type: Number,
    category: Number,

    header_image: String,
    wellcome_modal_image: String,
    facebook_add_image: String,

    client_example_1_company: String,
    client_example_2_company: String,
    client_example_3_company: String,

    client_example_1_phrase: String,
    client_example_2_phrase: String,
    client_example_3_phrase: String
});

const Campaign = mongoose.model<CampaignInterface>('campaign', CampaignSchema);

export default Campaign;
