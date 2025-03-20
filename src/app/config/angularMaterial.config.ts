
import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const angularMaterialProviders = [
  importProvidersFrom(MatSnackBarModule) 
];
