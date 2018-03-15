// @flow

import React from 'react'
import { connect } from 'react-redux'
import LandingPage from '../../routes/landing/containers/LandingPage'
import Spinner from 'react-spinkit'
import CityModel from '../endpoint/models/CityModel'
import Layout from '../layout/components/Layout'
import LocationLayout from '../layout/containers/LocationLayout'
import MainDisclaimerPage from '../../routes/main-disclaimer/components/MainDisclaimerPage'
import GeneralFooter from '../layout/components/GeneralFooter'
import GeneralHeader from '../layout/components/GeneralHeader'
import LanguageModel from '../endpoint/models/LanguageModel'
import CategoriesMapModel from '../endpoint/models/CategoriesMapModel'
import CategoriesPage from '../../routes/categories/containers/CategoriesPage'
import EventsPage from '../../routes/events/containers/EventsPage'
import EventModel from '../endpoint/models/EventModel'
import ExtrasPage from '../../routes/extras/containers/ExtrasPage'
import ExtraModel from '../endpoint/models/ExtraModel'
import DisclaimerPage from '../../routes/disclaimer/containers/DisclaimerPage'
import DisclaimerModel from '../endpoint/models/DisclaimerModel'
import SearchPage from '../../routes/search/containers/SearchPage'
import PdfFetcherPage from '../../routes/pdf-fetcher/containers/PdfFetcherPage'
import { LANDING_ROUTE } from './routes/landing'
import { MAIN_DISCLAIMER_ROUTE } from './routes/mainDisclaimer'
import { CATEGORIES_ROUTE } from './routes/categories'
import { EVENTS_ROUTE } from './routes/events'
import { EXTRAS_ROUTE } from './routes/extras'
import { DISCLAIMER_ROUTE } from './routes/disclaimer'
import { SEARCH_ROUTE } from './routes/search'
import { PDF_FETCHER_ROUTE } from './routes/pdfFetcher'
import { I18N_REDIRECT_ROUTE } from './routes/i18nRedirect'
import { CATEGORIES_REDIRECT_ROUTE } from './routes/categoriesRedirect'

type Props = {
  viewportSmall: boolean,
  currentRoute: string,
  cities: Array<CityModel>,
  languages: Array<LanguageModel>,
  categories: CategoriesMapModel,
  events: Array<EventModel>,
  extras: Array<ExtraModel>,
  disclaimer: DisclaimerModel
}

class Switcher extends React.Component<Props> {
  getComponent () {
    const {currentRoute, cities, events, categories, extras, disclaimer} = this.props
    const LoadingSpinner = () => <Spinner name='line-scale-party' />

    switch (currentRoute) {
      case LANDING_ROUTE:
        return cities ? <LandingPage /> : <LoadingSpinner />
      case MAIN_DISCLAIMER_ROUTE:
        return <MainDisclaimerPage />
      case CATEGORIES_ROUTE:
        return categories ? <CategoriesPage /> : <LoadingSpinner />
      case EVENTS_ROUTE:
        return events ? <EventsPage /> : <LoadingSpinner />
      case EXTRAS_ROUTE:
        return extras ? <ExtrasPage /> : <LoadingSpinner />
      case DISCLAIMER_ROUTE:
        return disclaimer ? <DisclaimerPage /> : <LoadingSpinner />
      case SEARCH_ROUTE:
        return categories ? <SearchPage /> : <LoadingSpinner />
      case PDF_FETCHER_ROUTE:
        return categories ? <PdfFetcherPage /> : <LoadingSpinner />
    }
  }

  render () {
    const {viewportSmall, currentRoute, cities, languages} = this.props

    if (currentRoute === LANDING_ROUTE) {
      return <Layout footer={<GeneralFooter />}>
        {this.getComponent()}
      </Layout>
    } else if ([MAIN_DISCLAIMER_ROUTE, PDF_FETCHER_ROUTE, I18N_REDIRECT_ROUTE, CATEGORIES_REDIRECT_ROUTE].includes(currentRoute)) {
      return <Layout header={<GeneralHeader viewportSmall={viewportSmall} />}
                     footer={<GeneralFooter />}>
        {this.getComponent()}
      </Layout>
    } else if (cities && languages) {
      return <LocationLayout>
        {this.getComponent()}
      </LocationLayout>
    } else {
      return <Spinner name='line-scale-party' />
    }
  }
}

const mapStateToProps = state => ({
  viewportSmall: state.viewport.is.small,
  currentRoute: state.location.type,
  cities: state.cities,
  languages: state.languages,
  categories: state.categories,
  events: state.events,
  extras: state.extras,
  disclaimer: state.disclaimer
})

export default connect(mapStateToProps)(Switcher)
