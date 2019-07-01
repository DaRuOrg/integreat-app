// @flow

import * as React from 'react'
import connect from 'react-redux/es/connect/connect'
import { ActivityIndicator } from 'react-native'
import Extras from '../components/Extras'
import { type TFunction, translate } from 'react-i18next'
import { CityModel, createExtrasEndpoint, ExtraModel, Payload } from '@integreat-app/integreat-api-client'
import type { ThemeType } from '../../../modules/theme/constants/theme'
import request from '../../../modules/endpoint/request'
import type { StateType } from '../../../modules/app/StateType'
import type { NavigationScreenProp } from 'react-navigation'
import { baseUrl } from '../../../modules/endpoint/constants'
import Failure from '../../../modules/error/components/Failure'
import withTheme from '../../../modules/theme/hocs/withTheme'

type OwnPropsType = {| navigation: NavigationScreenProp<*> |}

type StatePropsType = {| city: string, language: string, cities: ?Array<CityModel> |}

type PropsType = { ...OwnPropsType, ...StatePropsType }

const mapStateToProps = (state: StateType, ownProps: OwnPropsType): StatePropsType => {
  const language = state.cityContent.language
  const cities: ?Array<CityModel> = state.cities.errorMessage !== undefined ? null : state.cities.models
  if (!language) {
    throw new Error('The state does not contain a language. Therefore it is not possible to open the extras!')
  }

  return {
    city: ownProps.navigation.getParam('cityCode'),
    language: language,
    cities
  }
}

type ExtrasPropsType = {|
  navigation: NavigationScreenProp<*>,
  city: string,
  cities: ?Array<CityModel>,
  language: string,
  navigateToExtra: (path: string, isExternalUrl: boolean) => void,
  theme: ThemeType,
  t: TFunction
|}

type ExtrasStateType = {|
  extras: ?Array<ExtraModel>,
  error: ?Error
|}

class ExtrasContainer extends React.Component<ExtrasPropsType, ExtrasStateType> {
  constructor (props: ExtrasPropsType) {
    super(props)
    this.state = {extras: null, error: null}
  }

  componentWillMount () {
    this.loadExtras()
  }

  navigateToExtra = (path: string, isExternalUrl: boolean, postData: ?Map<string, string>) => {
    if (!this.props.navigation.push) {
      throw new Error('push is not defined on navigation')
    }
    if (isExternalUrl) {
      this.props.navigation.push('ExternalExtra', {url: path, postData})
    } else {
      const params = {city: this.props.city, extras: this.state.extras, offerHash: null}
      this.props.navigation.push(path, params)
    }
  }

  async loadExtras () {
    const {city, language} = this.props
    const payload: Payload<Array<ExtraModel>> = await request(createExtrasEndpoint(baseUrl), {city, language})

    if (payload.error) {
      this.setState(() => ({error: payload.error, extras: null}))
    } else {
      this.setState(() => ({error: null, extras: payload.data}))
    }
  }

  render () {
    const {theme, t, cities, navigation, city} = this.props
    const {extras, error} = this.state

    if (error || !cities) {
      return <Failure error={error} />
    }

    if (!extras) {
      return <ActivityIndicator size='large' color='#0000ff' />
    }

    return <Extras extras={extras} navigateToExtra={this.navigateToExtra} theme={theme} t={t} cities={cities}
                   navigation={navigation} cityCode={city} />
  }
}

export default translate('extras')(
  connect<PropsType, OwnPropsType, _, _, _, _>(mapStateToProps)(
    withTheme(props => props.language)(
      ExtrasContainer
    )))
