import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './reducers/app-reducer';
//#region Effects Services
    import { ProfessionEffectService } from './effects/profession-effect.service';
//#endregion

@NgModule({
    declarations: [ ],
    imports: [
        StoreModule.provideStore(reducer),
        RouterStoreModule.connectRouter(),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
        EffectsModule.run(ProfessionEffectService)
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
