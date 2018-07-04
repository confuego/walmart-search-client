import { Component, OnInit, Input, ViewChild, AfterContentInit } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SearchComponent,
    multi: true
  }]
})
export class SearchComponent implements ControlValueAccessor, OnInit, AfterContentInit {
  private onChange: (value: string) => void;
  private onTouch: (value: string) => void;
  private searchControl: FormControl = this.formBuilder.control({ value: undefined });

  public value: string;
  public disabled: boolean;
  @Input() placeholder: string;
  @Input() width: number;

  @Input()
  public autocomplete: MatAutocomplete;

  @ViewChild('searchInput') searchInput: MatAutocompleteTrigger;

  public writeValue(obj: string): void {
    this.value = obj;
    this.searchControl.setValue(this.value, { emitEvent: false });
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: (value: string) => void): void {
    this.onTouch = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = coerceBooleanProperty(isDisabled);
  }


  ngOnInit(): void {
    this.searchControl
      .valueChanges
      .subscribe((searchText: string) => {
        this.writeValue(searchText);

        if (this.onChange && this.onTouch) {
          this.onChange(this.value);
          this.onTouch(this.value);
        }
      });
  }

  ngAfterContentInit(): void {
    this.searchInput.autocomplete = this.autocomplete;
  }

  constructor(private formBuilder: FormBuilder) { }

}
