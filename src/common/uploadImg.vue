<template>
    <div class="vue-uploader">
        <div class="file-list">
            <section v-for="(file, index) in files" :key="index" class="file-item draggable-item">
                <img :src="file.src" alt="" ondragstart="return false;">
                <span class="file-remove" @click="remove(index)">+</span>
            </section>
            <section v-if="files.length<max" class="file-item">
                <a class="add" herp="javascript:;">
                    <input type="file" accept="image/*" @change="fileChanged" ref="file">
                    <span>+</span>
                </a>
            </section>
        </div>
        <p v-if="!!title" class="title">{{title}}</p>
    </div>
</template>
<script>
export default {
  props: {
    max: {
      type: Number,
      default: 1
    },
    title: String
  },
  data() {
    return {
      files: [],
      httpUrls: []
    };
  },
  created(){
    this.httpUrls=[],
    this.files=[]
  },
  activated(){
    this.httpUrls=[],
    this.files=[]
  },
  methods: {
    upload(item) {
      this.$http
        .post("/mall/v1/uploadFile", {
          file: item.src.split(",")[1],
          fileName: item.name
        })
        .then(data => {
          this.files.push(item);
          this.httpUrls.push(data.result);
          this.$emit("upload", this.httpUrls);
        })
        .catch(e => {
          this.$vux.toast.text(e);
        });
    },
    remove(index) {
      this.files.splice(index, 1);
      this.httpUrls.splice(index, 1);
      this.$emit("upload", this.httpUrls);
    },
    fileChanged() {
      let list = this.$refs.file.files,
        len = Object.keys(list).length;
      if (len > this.max) {
        this.$vux.toast.text(`最多只能上传${this.max}张`);
      }
      for (let i = 0; i < list.length; i++) {
        if (!this.isContain(list[i]) && i < this.max) {
          const item = {
            name: list[i].name,
            size: list[i].size,
            file: list[i]
          };
          this.html5Reader(list[i])
            .then(data => {
              item.src = data;
              this.upload(item);
            })
            .catch(e => {
              this.$vux.toast.text(e);
            });
        }
      }
      this.$refs.file.value = "";
    },
    // Promise 封装异步读取图片转base64
    html5Reader(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
          let canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            image = new Image();
          image.src = this.result;
          image.onload = function() {
          let cw = image.width,
              ch = image.height,
               w = image.width,
               h = image.height;
            canvas.width = w;
            canvas.height = h;
            if (cw > 400 && cw > ch) {
              w = 400;
              h = 400 * ch / cw;
              canvas.width = w;
              canvas.height = h;
            }
            if (ch > 400 && ch > cw) {
              h = 400;
              w = 400 * cw / ch;
              canvas.width = w;
              canvas.height = h;
            }
            ctx.drawImage(image, 0, 0, w, h);
            let base64 = canvas.toDataURL("image/jpeg", 0.7);
            resolve(base64);
          };
        };
        reader.onerror = reject;
      });
    },
    isContain(file) {
      return this.files.find(
        item => item.name === file.name && item.size === file.size
      );
    }
  }
};
</script>
<style lang="less" scoped>
.vue-uploader {
  display: inline-block;
  p.title {
    font-size: 0.24rem;
    color: #333333;
    text-align: center;
    width: 80px;
    padding-left: 10px;
  }
}
.vue-uploader .file-list {
  padding: 10px 0px;
}
.vue-uploader .file-list:after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
  font-size: 0;
}
.vue-uploader .file-list .file-item {
  float: left;
  position: relative;
  width: 90px;
  text-align: center;
}
.vue-uploader .file-list .file-item img {
  width: 78px;
  height: 78px;
  border: 1px solid #ececec;
  vertical-align: middle;
}
.vue-uploader .file-list .file-item .file-remove {
  position: absolute;
  right: 12px;
  display: none;
  top: 4px;
  width: 14px;
  height: 14px;
  color: white;
  cursor: pointer;
  line-height: 12px;
  border-radius: 100%;
  transform: rotate(45deg);
  background: rgba(0, 0, 0, 0.5);
}
.vue-uploader .file-list .file-item:hover .file-remove {
  display: inline;
}
.vue-uploader .file-list .file-item .file-name {
  margin: 0;
  height: 40px;
  word-break: break-all;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.vue-uploader .add {
  position: relative;
  width: 78px;
  height: 78px;
  margin-left: 10px;
  float: left;
  text-align: center;
  line-height: 78px;
  border: 1px dashed #ececec;
  font-size: 30px;
  cursor: pointer;
  color: #999999;
}
.vue-uploader .upload-func {
  display: flex;
  padding: 10px;
  margin: 0px;
  background: #f8f8f8;
  border-top: 1px solid #ececec;
}
.vue-uploader .upload-func .progress-bar {
  flex-grow: 1;
}
.vue-uploader .upload-func .progress-bar section {
  margin-top: 5px;
  background: #00b4aa;
  border-radius: 3px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  transition: all 0.5s ease;
}
.vue-uploader .upload-func .operation-box {
  flex-grow: 0;
  padding-left: 10px;
}
.vue-uploader .upload-func .operation-box button {
  padding: 4px 12px;
  color: #fff;
  background: #007acc;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}
input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>
