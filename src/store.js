/* 用于存储各类信息
* */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 存储当前用户的信息
    user: null,
    // 存储所有消息，以 groupId 为键，一个群组对应一个消息数组
    messages: [],
    // 存储用户和群组 ID 的映射关系。
    groupIdMap: {
      '文件管理助手': 4,
      '应用软件架构课程设计群': 5,
      '2024汇编语言': 6,
      '2024软工实习': 7,
      '宋唯嘉': 91001,
      '杨雪峰': 91002,
      '秦济深': 91003,
      '唐棣彬': 91004,
    }
  },
  // 修改应用程序状态的方法
  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    /*
    * 向指定群组添加消息
    * `state`: 当前Vuex的状态
    * `message`: 新的消息对象
    * `groupId`: 消息所属Id
    * 将消息添加到对应的群组的消息数组中，如果不存在则创建
    * */
    addMessage(state, { message, groupId }) {
      if (!state.messages[groupId]) {
        Vue.set(state.messages, groupId, []);
      }
      state.messages[groupId].push(message);
    },

    setGroupId(state, { otherUserId, groupId }) {
      Vue.set(state.groupIdMap, otherUserId, groupId);
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user);
    },

    /* 调用 `addMessage` mutation 来指定群组添加消息
    *  `commit`：用于提交 mutation 的方法
    *  `message`：新的消息对象
    *  `groupId`：消息所属的群组Id
    * */
    addMessage({ commit }, { message, groupId }) {
      commit('addMessage', { message, groupId });
    },
    setGroupId({ commit }, { otherUserId, groupId }) {
      commit('setGroupId', { otherUserId, groupId });
    }
  }
});
