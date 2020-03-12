const assist = {
  state: {
    assistPoll: 'tp', // 水质反演顶部污染物类型
    assistYear: '2016', // 水质反演顶部时间
    assistTypeValue: '补水' // 辅助决策处理类型
  },
  mutations: {
    set_assistPoll: (state, assistPoll) => {
      state.assistPoll = assistPoll
    },
    set_assistYear: (state, assistYear) => {
      state.assistYear = assistYear
    },
    set_assistTypeValue: (state, assistTypeValue) => {
      state.assistTypeValue = assistTypeValue
    }
  }
}

export default assist
