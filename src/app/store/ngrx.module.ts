import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './reducers/app-reducer';
import { ProfessionEffectService } from './effects/profession-effect.service';
import { ActivityEffectService } from './effects/activity-effect.service';
import { LocationEffectService } from './effects/location-effect.service';
import { ProductEffectService } from './effects/product-effect.service';

@NgModule({
    declarations: [ ],
    imports: [
        StoreModule.provideStore(reducer),
        RouterStoreModule.connectRouter(),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
        EffectsModule.run(ProfessionEffectService),
        EffectsModule.run(ActivityEffectService),
        EffectsModule.run(LocationEffectService),
        EffectsModule.run(ProductEffectService)
    ],
    providers: [],
    exports: [
        StoreModule,
        RouterStoreModule,
        StoreDevtoolsModule,
        EffectsModule
    ]
})
export class NgRxModule {}
