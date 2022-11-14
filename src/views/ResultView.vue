<template>
  <div class="actions">
    <router-link to="/" v-slot="{ href, navigate }" class="text-decoration-none w-auto d-inline-block">
      <button :href="href" @click="navigate" class="no-background">
        <img src="@/assets/images/Triangle.svg" class="icon-left" /><span>Geri</span>
        <!--{{ // route.name }}-->
      </button>
    </router-link>
  </div>
  <div class="content">
    <h2 v-if="userStore.current" class="user-name">{{ userStore.current.name }} {{ userStore.current.surname }}</h2>

    <section class="information">
      <div class="group">İştirak etdiyi qrup: {{ courseStore.course?.group }}</div>
      <div class="course-name">Kursun adı: {{ courseStore.course?.name }}</div>
    </section>
    <section class="score">
      <table>
        <thead>
          <tr>
            <th class="title">İştirakçının Soyadı Adı</th>
            <th class="title">Toplam aralıq imtahanlar üzrə nəticə</th>
            <th class="title">Canlı dərsdə iştirak</th>
            <th class="title">Video dərslərə baxış</th>
            <th class="title">Praktikada iştirak</th>
            <th class="title">Əlaqə</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-if="userStore.current" class="information-user-name">
              {{ userStore.current.name }} {{ userStore.current.surname }}
            </td>
            <td v-else></td>
            <td>{{ courseStore.course?.score.exam }}</td>
            <td>{{ courseStore.course?.score.participation }}</td>
            <td>{{ courseStore.course?.score.video }}</td>
            <td>{{ courseStore.course?.score.praktika }}</td>
            <td>{{ courseStore.course?.contact }}</td>
          </tr>
          <tr>
            <td colspan="6" class="no-background-color"></td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="questions">
      <table>
        <thead>
          <tr>
            <th class="title">Tədris elementinin adı</th>
            <th class="title">Növü</th>
            <th class="title">Tarix</th>
            <th class="title">Statusu</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, key) in courseStore.course?.sections" v-bind:key="key">
            <tr>
              <td colspan="6" class="description" :style="{ backgroundColor: item.color }">
                {{ item.name }}
                <span v-if="item.information">
                  <img src="@/assets/images/InfoButton.svg" :title="item.information" alt="" />
                </span>
              </td>
            </tr>
            <template v-for="(question, qKey) in item.questions" v-bind:key="qKey">
              <tr>
                <td>{{ question.question }}</td>
                <td>{{ courseType[question.type] }}</td>
                <td>
                  <span class="d-flex align-items-end">
                    <img src="@/assets/images/WatchLater.svg" alt="" class="pe-1" />
                    <span>{{ question.date }}</span>
                  </span>
                </td>
                <td class="status">
                  <template v-for="(state, sKey) in question.status" v-bind:key="sKey">
                    <span :style="{ color: state.color }">{{ state.text }}</span>
                    <span v-if="question.status.length - 1 > sKey">, </span>
                  </template>
                </td>
              </tr>
            </template>
            <tr>
              <td colspan="6" class="no-background-color"></td>
            </tr>
          </template>
        </tbody>
      </table>
    </section>
    <section class="result">
      <h3>Təlim iştirakçısı üzrə hesabatlılıq</h3>
      <table class="table-min">
        <thead>
          <tr>
            <th class="title">Praktiki məşğələ üzrə qrupun hesabatı</th>
            <th class="title">İmtahanın nəticəsi</th>
            <th class="title">İmtahan sənədləri</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img src="@/assets/images/LibraryBooks.svg" v-if="courseStore.course?.result.group" /></td>
            <td>{{ courseStore.course?.result.point }}</td>
            <td>
              <img v-if="courseStore.course?.result.papers[0]" src="@/assets/images/PhotoLibrary.svg" class="papers" />
              <img v-if="courseStore.course?.result.papers[1]" src="@/assets/images/LibraryBooks.svg" class="papers" />
              <img v-if="courseStore.course?.result.papers[2]" src="@/assets/images/Clarity.svg" class="papers" />
            </td>
          </tr>
          <tr>
            <td colspan="6" class="no-background-color"></td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="actions">
      <button class="btn btn-link"><img src="@/assets/images/Download.svg" />Excel yüklə</button>
      <button class="btn btn-link"><img src="@/assets/images/Capet.svg" />Çap et</button>
    </section>
  </div>
</template>

<script lang="ts">
  import type { AxiosResponse } from 'axios';
  import { defineComponent } from 'vue';

  import instance from '@/components/interceptor/instance';
  import type { Course } from '@/dto/course.dto';
  import { CourseType } from '@/dto/course.dto';
  import { useCourseStore } from '@/stores/course';
  import { useUserStore } from '@/stores/user';

  export default defineComponent({
    name: 'ResultView',
    data() {
      return {
        userStore: useUserStore(),
        courseStore: useCourseStore(),
        courseType: CourseType,
      };
    },
    mounted() {
      this.getCourse();
    },
    methods: {
      async getCourse() {
        const course = await this.httpGetCourse();
        this.courseStore.setCourse(course);
      },
      async httpGetCourse(): Promise<Course> {
        const response: AxiosResponse<Course> = await instance.get(`${import.meta.env.VITE_API}/course.json`);

        return response.data;
      },
    },
  });
</script>

<style lang="scss">
  .content {
    color: #253858;

    .user-name {
      margin-top: 30px;
      margin-bottom: 20px;
      font-size: 30px;
      font-weight: 700;
    }

    .information {
      margin-bottom: 24px;
      font-weight: 400;
      line-height: 30px;
    }

    .score,
    .questions,
    .result {
      table {
        width: 100%;

        thead tr {
          background-color: #ffffff;

          th {
            padding-right: 7px;
            padding-left: 16px;
            height: 64px;
            border: 1px solid #dddddd;
            font-size: 14px;
            font-weight: 700;
            line-height: 18px;
          }
        }

        tbody tr {
          td {
            padding-right: 7px;
            padding-left: 16px;
            height: 40px;
            border: 1px solid #dddddd;
            background-color: #ffffff;
            font-size: 12px;
            font-weight: 400;
            line-height: 16px;

            &.information-user-name {
              font-weight: 700;
            }

            &.no-background-color {
              height: 20px;
              border: none;
              background-color: transparent;
            }

            &.description {
              background-color: #2c7ef9;
              color: #ffffff;
              font-size: 12px;
              font-weight: 700;
              line-height: 16px;
            }

            &.status {
              font-size: 12px;
              font-weight: 700;
              line-height: 16px;
            }

            .papers {
              margin-right: 6px;
            }
          }
        }
      }
    }

    .result {
      margin-top: 20px;

      h3 {
        margin-bottom: 15px;
        font-size: 24px;
        font-weight: 700;
        line-height: 30px;
      }

      .table-min {
        max-width: 350px;
      }
    }

    .actions {
      button {
        color: #2c7ef9;
        font-size: 18px;
        font-weight: 700;
        line-height: 24px;

        img {
          padding-right: 12px;
        }
      }
    }
  }
</style>
