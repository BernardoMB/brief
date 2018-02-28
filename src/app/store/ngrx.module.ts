import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers/app-reducer';
import { EffectsModule } from '@ngrx/effects';
import { ActivityEffectService } from './effects/activity-effect.service';
import { LocationEffectService } from './effects/location-effect.service';
import { ProductEffectService } from './effects/product-effect.service';

@NgModule({
    declarations: [ ],
    imports: [
        // Register reducers
        StoreModule.forRoot(reducers),
        // Register effects
        EffectsModule.forRoot([
            ActivityEffectService,
            LocationEffectService,
            ProductEffectService
        ])
    ],
    providers: [],
    exports: [
        StoreModule,
        EffectsModule
    ]
})
export class NgRxModule {}
