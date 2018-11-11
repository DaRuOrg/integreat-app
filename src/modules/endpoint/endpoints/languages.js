// @flow

import LanguageModel from '../models/LanguageModel'
import { apiUrl } from '../constants'
import EndpointBuilder from '../EndpointBuilder'
import ParamMissingError from '../errors/ParamMissingError'
import type { JsonLanguageType } from '../types'

const LANGUAGES_ENDPOINT_NAME = 'languages'

type ParamsType = { city: ?string }

export default new EndpointBuilder<ParamsType, Array<LanguageModel>>(LANGUAGES_ENDPOINT_NAME)
  .withParamsToUrlMapper((params): string => {
    if (!params.city) {
      throw new ParamMissingError(LANGUAGES_ENDPOINT_NAME, 'city')
    }
    return `${apiUrl}/${params.city}/de/wp-json/extensions/v3/languages`
  })
  .withMapper((json: Array<JsonLanguageType>) => json
    .map(language => new LanguageModel(
      language.code,
      language.native_name
    ))
    .sort((lang1, lang2) => lang1.code.localeCompare(lang2.code))
  )
  .build()
