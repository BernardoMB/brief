export interface IUIState {
    // Details header
    headerTitle: string;
    headerImgUrl: string;
    headerOpacity: boolean;
    // Offer header
    offerHeaderTitle: any;
    
    isLoading: boolean;
    confirmed: boolean;
}

export const INITIAL_UI_STATE: IUIState = {
    // Details header
    headerTitle: '',
    headerImgUrl: '',
    headerOpacity: undefined,
    // Offer header
    offerHeaderTitle: { title: '', size: '25px'},
    
    isLoading : false,
    confirmed: false
};
