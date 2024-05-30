<template>
  <div class="home">
    <div class="home_box">
      <div class="home_box_index">
        <div class="home_box_index_img">
          <img src="@/assets/images/home.svg" alt="" />
        </div>
        <div class="home_box_index_h">
          <h2 class="home_box_index_h_h2">
            欢迎来到 stellaris智慧接口调用平台<span class="icon"></span>
          </h2>
          <h3 class="home_box_index_h_h3">
            Stellaris智慧接口调用平台是一个专门为开发者提供API资源的开放平台，旨在促进创新和合作，为开发者提供丰富的API资源和服务。我们提供了一系列功能强大的API，涵盖了各种领域的数据和功能，以满足开发者在应用开发过程中的需求。
            <span class="icon"></span>
          </h3>
        </div>
        <div class="home_box_index_p">
          <p>
            <span class="icon icon1"></span
            >作为用户您可以通过注册登录账户，获取接口调用权限，并根据自己的需求浏览和选择适合的接口。您可以在线进行接口调试，快速验证接口的功能和效果。
          </p>
          <p>
            <span class="icon icon2"></span>作为开发者
            我们提供了客户端SDK，通过开发者凭证即可将轻松集成接口到您的项目中，实现更高效的开发和调用。
          </p>
          <p>
            <span class="icon icon3"></span
            >您可以将自己的接口接入到Stellaris智慧接口调用平台上，并发布给其他用户使用。您可以管理和各个接口，以便更好地分析和优化接口性能。
          </p>
          <p>
            <span class="icon icon4"></span
            >我们还提供了开发者在线文档和技术支持，帮助您快速接入和发布接口。
          </p>
          <p>
            <span class="icon icon5"></span
            >无论您是用户还是开发者，Stellaris智慧接口调用平台都致力于提供稳定、安全、高效的接口调用服务，帮助您实现更快速、便捷的开发和调用体验。
          </p>
        </div>
        <div class="home_box_index_flex">
          <div class="home_box_index_flex_box">
            <div>
              <i class="box1"></i>
              <p>丰富的API资源</p>
            </div>
            <p>
              Stellaris智慧接口调用平台提供了多种类型的API，涵盖了数据、功能、工具等方面，可以满足各种不同需求的开发者。
            </p>
          </div>
          <div class="home_box_index_flex_box">
            <div>
              <i class="box2"></i>
              <p>易于使用</p>
            </div>
            <p>
              我们的API设计简单易懂，提供了详细的文档和示例代码，帮助开发者快速上手。
            </p>
          </div>
          <div class="home_box_index_flex_box">
            <div>
              <i class="box3"></i>
              <p>可靠性</p>
            </div>
            <p>
              Stellaris智慧接口调用平台的API具有较高的可靠性和稳定性，保障用户的用户体验。
            </p>
          </div>
          <div class="home_box_index_flex_box">
            <div>
              <i class="box4"></i>
              <p>安全保障</p>
            </div>
            <p>
              我们采取了严格的安全措施，保护用户数据的安全和隐私。
            </p>
          </div>
          <div class="home_box_index_flex_box">
            <div>
              <i class="box5"></i>
              <p>稳定和安全</p>
            </div>
            <p>
              平台致力于提供稳定和安全的接口调用服务，采用了安全措施和技术手段，保障用户数据的安全性和隐私保护。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped lang="less">
.icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url(@/assets/images/home/qingzhu.svg) no-repeat;
  background-size: 100% 100%;
}
.home {
  padding: 20px 60px 20px 60px;
  width: 100%;
  height: calc(100% - 60px);

  .home_box {
    width: 100%;
    height: 530px;

    background-color: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
    -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
    border-radius: 12px;
    -webkit-border-radius: 12px;
    // color: rgba(255, 255, 255, 0.75);

    .home_box_index {
      padding: 20px;
      width: 100%;
      height: 100%;
      border-radius: 12px;

      position: relative;

      .home_box_index_img {
        width: 470px;
        height: 350px;

        position: absolute;
        top: -10px;
        right: 10px;

        img {
          width: 470px;
          z-index: -1;
          opacity: 0.3;
        }
      }

      .home_box_index_h_h2 {
        font-weight: 700;
        margin-bottom: 20px;
        .icon {
          width: 26px;
          height: 26px;
          vertical-align: top;
        }
      }
      .home_box_index_h_h3 {
        width: 70%;
        font-weight: 600;
        margin-bottom: 20px;
        .icon {
          width: 22px;
          height: 22px;
          background: url(@/assets/images/home/banshou.svg) no-repeat;
          background-size: 100% 100%;
          vertical-align: top;
        }
      }
      .home_box_index_p {
        font-size: 16px;
        font-weight: 600;
        p {
          margin-bottom: 7px;
          .icon1 {
            width: 18px;
            height: 18px;
            background: url(@/assets/images/home/manyi.svg) no-repeat;
            background-size: 100% 100%;
            vertical-align: top;
            margin-right: 7px;
          }
          .icon2 {
            width: 18px;
            height: 18px;
            background: url(@/assets/images/home/diannao.svg) no-repeat;
            background-size: 100% 100%;
            vertical-align: top;
            margin-right: 7px;
          }
          .icon3 {
            width: 18px;
            height: 18px;
            background: url(@/assets/images/home/hezuo.svg) no-repeat;
            background-size: 100% 100%;
            vertical-align: top;
            margin-right: 7px;
          }
          .icon4 {
            width: 18px;
            height: 18px;
            background: url(@/assets/images/home/ok-emoji.svg) no-repeat;
            background-size: 100% 100%;
            vertical-align: top;
            margin-right: 7px;
          }
          .icon5 {
            width: 18px;
            height: 18px;
            background: url(@/assets/images/home/anquantianchong.svg) no-repeat;
            background-size: 100% 100%;
            vertical-align: top;
            margin-right: 7px;
          }
        }
      }
      .home_box_index_flex {
        margin: 20px;
        width: calc(100% - 40px);
        height: 220px;
        // background-color: antiquewhite;

        position: absolute;
        right: 0;
        bottom: 0;

        display: flex;
        justify-content: space-between;
        .home_box_index_flex_box {
          width: 19%;
          height: 100%;
          padding: 15px;
          border-radius: 20px;
          opacity: 1;
          background: linear-gradient(185deg, #ffffff);
          box-shadow: 9px 9px 18px #d4d4d4, -9px -9px 18px #ffffff;

          & > div {
            width: 100%;
            height: 50px;

            display: flex;
            line-height: 50px;

            // & > i {
            //   display: inline-block;
            //   width: 32px;
            //   height: 32px;
            //   margin: auto 0;
            //   margin-right: 10px;
            //   margin-left: 5px;
            //   background: url(@/assets/images/home/1_square_solid.svg) no-repeat;
            //   background-size: 100% 100%;
            //   vertical-align: middle;
            // }
            & > p {
              font-size: 16px;
              font-weight: 600;
            }
          }

          & > p {
            font-size: 15px;
            font-weight: 600;
            line-height: 25px;
          }
        }

        // &:nth-child(2)  {
        //   // background: url(@/assets/images/home/2_square_solid.svg) no-repeat;
        //   // background-size: 100% 100%;
        //   background-color: aqua !important;
        // }
      }
    }
  }
}
.box1{
  display: inline-block;
  width: 32px;
  height: 32px;
  margin: auto 0;
  margin-right: 10px;
  margin-left: 5px;
  background: url(@/assets/images/home/1_square_solid.svg) no-repeat;
  background-size: 100% 100%;
  vertical-align: middle;
}
.box2 {
  display: inline-block;
  width: 32px;
  height: 32px;
  margin: auto 0;
  margin-right: 10px;
  margin-left: 5px;
  background: url(@/assets/images/home/2_square_solid.svg) no-repeat;
  background-size: 100% 100%;
  vertical-align: middle;
}
.box3 {
  display: inline-block;
  width: 32px;
  height: 32px;
  margin: auto 0;
  margin-right: 10px;
  margin-left: 5px;
  background: url(@/assets/images/home/3_square_solid.svg) no-repeat;
  background-size: 100% 100%;
  vertical-align: middle;
}
.box4 {
  display: inline-block;
  width: 32px;
  height: 32px;
  margin: auto 0;
  margin-right: 10px;
  margin-left: 5px;
  background: url(@/assets/images/home/4_square_solid.svg) no-repeat;
  background-size: 100% 100%;
  vertical-align: middle;
  
}
.box5 {
  display: inline-block;
  width: 32px;
  height: 32px;
  margin: auto 0;
  margin-right: 10px;
  margin-left: 5px;
  background: url(@/assets/images/home/5_square_solid.svg) no-repeat;
  background-size: 100% 100%;
  vertical-align: middle;
}
</style>