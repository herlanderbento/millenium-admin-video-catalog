import { Exclude, Expose } from 'class-transformer';
import {
  PaginationPresenter,
  PaginationPresenterProps,
} from './pagination.presenter';
import { CategoryPresenter } from '../categories-module/categories.presenter';

export abstract class CollectionPresenter {
  @Exclude()
  protected paginationPresenter: PaginationPresenter;

  constructor(props: PaginationPresenterProps) {
    this.paginationPresenter = new PaginationPresenter(props);
  }

  @Expose({ name: 'meta' })
  get meta() {
    return this.paginationPresenter;
  }

  abstract get data(): CategoryPresenter[];
}
