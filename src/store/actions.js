import { getPlaylistDetail, getSongDetail } from "network/songdetail";

export default {
  addSong(context, payload) {
    // const obj = {}
    let trackIds = []
    let tableData = []
    // 获取歌单详情
    if(payload.length > 1) {
      getPlaylistDetail(payload).then(res => {
        // console.log(res);
        res.data.playlist.trackIds.forEach(item => {
          trackIds.push(item.id)
        })
        getSongDetail(trackIds).then(res => {
          tableData = res.data.songs;
        })
      })
    } else {
      getSongDetail(payload).then(res => {
        console.log(res);
        tableData.push(...res.data.songs);
      })
    }
    console.log(tableData);
    context.commit("addSong", tableData)
  },
};
