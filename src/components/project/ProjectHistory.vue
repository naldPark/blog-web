<template>
	<div class='project-history-wrap'>
		<v-timeline side="end" class="text-grey">
			<v-timeline-item hide-dot class="text-primary text-right mt-12 mb-12" color="black" size='large'>
				<h2>Release Note History . . </h2>
			</v-timeline-item>
			<v-timeline-item class="mb-1" dot-color='grey' fill-dot size='x-small'>
				<v-card class="elevation-2" variant='outlined'>
					<v-card-title class="text-subtitle-1 text-secondary">
						📺💻🕋 리펙토링
					</v-card-title>
					<v-card-text class="font-weight-light">

						<div>시대의 흐름에 따라 Vue3 + nuxt.js + Typescript 로 리팩토링 (진행중)</div>
						<v-btn href="https://daylog.nald.me/retrospect/vue2-greater-than-vue3" target="_blank" variant="tonal"
							class="mt-3">
							More detail here <i class="mdi mdi-link-variant"></i>
						</v-btn>
					</v-card-text>
				</v-card>
			</v-timeline-item>
			<v-timeline-item class="mb-1" dot-color='grey' fill-dot size='x-small'>
				<v-card class="elevation-2 " variant='outlined'>
					<v-card-title class="text-subtitle-1 text-secondary">
						💻🕋 Free S3
					</v-card-title>
					<v-card-text class="font-weight-light">
						<div>ubuntu에서 wget으로 file을 편리하게 받고싶어서 nodejs서버를 만듬</div>
						<v-btn variant='tonal' href="https://daylog.nald.me/retrospect/s3" target="_blank" class="mt-3">
							More detail here <i class="mdi mdi-link-variant"></i>
						</v-btn>
					</v-card-text>

				</v-card>
			</v-timeline-item>
			<v-timeline-item class="mb-1" dot-color='grey' fill-dot size='x-small'>
				<v-card class="elevation-2 " variant='outlined'>
					<v-card-title class="text-subtitle-1 text-secondary">
						💻🕋 Free EC2
					</v-card-title>
					<v-card-text class="font-weight-light">
						<div>nodejs 쿠버네티스 권한상승 방지</div>
						<v-btn variant='tonal' href="https://daylog.nald.me/retrospect/ec2" target="_blank" class="mt-3">
							More detail here <i class="mdi mdi-link-variant"></i>
						</v-btn>
					</v-card-text>
				</v-card>
			</v-timeline-item>
			<v-timeline-item hide-dot class="primary--text text-right mt-12 mb-12" color="black" large>
				<h2>2024년</h2>
			</v-timeline-item>
			<v-timeline-item class="mb-1" dot-color='grey' fill-dot size='x-small'>
				<v-card class="elevation-2 " variant='outlined'>
					<v-card-title class="text-subtitle-1 text-secondary">
						💻🕋 K8s
					</v-card-title>
					<v-card-text class="font-weight-light">
						<div>백엔드 쿠버네티스 상태조회</div>
						<v-btn variant='tonal' href="https://daylog.nald.me/infralogs/metric-server" target="_blank" class="mt-3">
							More detail here <i class="mdi mdi-link-variant"></i>
						</v-btn>
					</v-card-text>
				</v-card>
			</v-timeline-item>
			<v-timeline-item class="mb-1" dot-color='grey' fill-dot size='x-small'>
				<v-card class="elevation-2" variant='outlined'>
					<v-card-title class="text-subtitle-1 text-secondary">
						📺💻 K8s
					</v-card-title>
					<v-card-text class="font-weight-light">
						<div> 채팅방 페이지 만듬 ( JAVA )</div>
					</v-card-text>
				</v-card>
			</v-timeline-item>
			<v-timeline-item class="mb-1" dot-color='grey' fill-dot size='x-small'>
				<v-card class="elevation-2 " variant='outlined'>
					<v-card-title class="text-subtitle-1 text-secondary">
						📺 gojs
					</v-card-title>
					<v-card-text class="font-weight-light">
						<div> gojs로 infra structure 구현</div>
					</v-card-text>
				</v-card>
			</v-timeline-item>
			<v-timeline-item class="mb-1" dot-color='grey' fill-dot size='x-small'>
				<v-card class="elevation-2 " variant='outlined'>
					<v-card-title class="text-subtitle-1 text-secondary">
						📺 개발자도구 못하게 막기
					</v-card-title>
					<v-card-text class="font-weight-light">
						<div> 어떤 사이트에 개발자도구가 금지된걸 봤는데 적용해 보고 싶었음</div>
					</v-card-text>
				</v-card>
			</v-timeline-item>
			<v-timeline-item class="mb-1" dot-color='grey' fill-dot size='x-small'>
				<v-card class="elevation-2 " variant='outlined'>
					<v-card-title class="text-subtitle-1 text-secondary">
						🕋 kubernetes CRI containerd로 변경
					</v-card-title>
					<v-card-text class="font-weight-light">
						<div>kubernetes CRI containerd로 변경</div>
						<v-btn variant='tonal' href="https://daylog.nald.me/infralogs/on-premise-kubernetes/4.-on-premise-k8s-cri"
							target="_blank" class="mt-3">
							More detail here <i class="mdi mdi-link-variant"></i>
						</v-btn>
					</v-card-text>
				</v-card>
			</v-timeline-item>
			<v-timeline-item class="mb-1" dot-color='grey' fill-dot size='x-small'>
				<v-card class="elevation-2 " variant='outlined'>
					<v-card-title class="text-subtitle-1 text-secondary">
						📺💻🕋 스트리밍 서비스 & nfs
					</v-card-title>
					<v-card-text class="font-weight-light">
						<div>넷플릭스는 어떤 방식으로 작동할까가 시작</div>
						<v-btn variant='tonal' href="https://daylog.nald.me/backendlogs/ffmpeg-hls" target="_blank" class="mt-3">
							More detail here <i class="mdi mdi-link-variant"></i>
						</v-btn>
					</v-card-text>
				</v-card>
			</v-timeline-item>
			<v-timeline-item class="mb-1" dot-color='grey' fill-dot size='x-small'>
				<v-card class="elevation-2 " variant='outlined'>
					<v-card-title class="text-subtitle-1 text-secondary">
						📺💻🕋 Free RDB, ECR
					</v-card-title>
					<v-card-text class="font-weight-light">
						<div> 나스를 사고 무료 RDB, ECR: Elastic Container Registry로 사용
							컴류터가 너무 불안정해서 db도 꺼지고 했음</div>
						<v-btn variant='tonal' href="https://daylog.nald.me/infralogs/on-premise-repo-db/1.-docker-repository-nexus"
							target="_blank" class="mt-3">
							More detail here <i class="mdi mdi-link-variant"></i>
						</v-btn>
					</v-card-text>
				</v-card>
			</v-timeline-item>
			<v-timeline-item hide-dot class="primary--text text-right mt-12 mb-12" color="black" large>
				<h2>2023년</h2>
			</v-timeline-item>
			<v-timeline-item class="mb-1" dot-color='grey' fill-dot size='x-small'>
				<v-card class="elevation-2 " variant='outlined'>
					<v-card-title class="text-subtitle-1 text-secondary">
						🕋 CI / CD 구현
					</v-card-title>
					<v-card-text class="font-weight-light">
						<div>귀찮아서.. 젠킨스에서 권한의처리 엘리게이션 이라든가 롤바인딩 중요함</div>
						<v-btn variant='tonal' href="https://daylog.nald.me/infralogs/kubernetes/jenkins" target="_blank"
							class="mt-3">
							More detail here <i class="mdi mdi-link-variant"></i>
						</v-btn>
					</v-card-text>
				</v-card>
			</v-timeline-item>
			<v-timeline-item class="mb-1" dot-color='grey' fill-dot size='x-small'>
				<v-card class="elevation-2 " variant='outlined'>
					<v-card-title class="text-subtitle-1 text-secondary">
						📺 i18n 다국어 지원 구현
					</v-card-title>
					<v-card-text class="font-weight-light">
						<div>한 영 이렇게 바꾸는 사이트 들이 부러워서</div>
					</v-card-text>
				</v-card>
			</v-timeline-item>
			<v-timeline-item class="mb-1" dot-color='grey' fill-dot size='x-small'>
				<v-card class="elevation-2 " variant='outlined'>
					<v-card-title class="text-subtitle-1 text-secondary">
						📺💻 관리자 기능 구현
					</v-card-title>
					<v-card-text class="font-weight-light">
						<div>기본적인 건데 삭제 추가 변경 등의 대한 기능</div>
					</v-card-text>
				</v-card>
			</v-timeline-item>
			<v-timeline-item class="mb-1" dot-color='grey' fill-dot size='x-small'>
				<v-card class="elevation-2 " variant='outlined'>
					<v-card-title class="text-subtitle-1 text-secondary">
						📺💻 컨텍트페이지 이메일 stmp
					</v-card-title>
					<v-card-text class="font-weight-light">
						<div>문의를 게시판을 통해서 보기 귀찮고 slack알람을 할까 고민하다가 그냥 메일로 함</div>
					</v-card-text>
				</v-card>
			</v-timeline-item>
			<v-timeline-item class="mb-1" dot-color='grey' fill-dot size='x-small'>
				<v-card class="elevation-2 " variant='outlined'>
					<v-card-title class="text-subtitle-1 text-secondary">
						📺💻 로그인 기능 구현 (JWT)
					</v-card-title>
					<v-card-text class="font-weight-light">
						<div> JWT로 토큰방식으로 로그인 여부를 판단</div>
						<v-btn variant='tonal' href="https://daylog.nald.me/backendlogs/login" target="_blank" class="mt-3">
							More detail here <i class="mdi mdi-link-variant"></i>
						</v-btn>
					</v-card-text>
				</v-card>
			</v-timeline-item>
			<v-timeline-item class="mb-1" dot-color='grey' fill-dot size='x-small'>
				<v-card class="elevation-2 " variant='outlined'>
					<v-card-title class="text-subtitle-1 text-secondary">
						🕋 쿠버네티스 환경 셋업
					</v-card-title>
					<v-card-text class="font-weight-light">
						<div> ec2프리티어에 의존할수 없어서</div>
						<v-btn variant='tonal' href="https://daylog.nald.me/infralogs/on-premise-kubernetes/1.-kubernetes"
							target="_blank" class="mt-3">
							More detail here <i class="mdi mdi-link-variant"></i>
						</v-btn>
					</v-card-text>
				</v-card>
			</v-timeline-item>
			<v-timeline-item class="mb-1" dot-color='grey' fill-dot size='x-small'>
				<v-card class="elevation-2 " variant='outlined'>
					<v-card-title class="text-subtitle-1 text-secondary">
						💻 backend java jpa & 마리아디비 초기셋업
					</v-card-title>
					<v-card-text class="font-weight-light">
						<div> frontend만 사용하면 기능의 한계가 있기에 이것또한 가장 익숙한 것 채택</div>
						<v-btn variant='tonal' href="https://daylog.nald.me/infralogs/on-premise-repo-db/3.-maria-db" target="_blank"
							class="mt-3">
							More detail here <i class="mdi mdi-link-variant"></i>
						</v-btn>
					</v-card-text>
				</v-card>
			</v-timeline-item>
			<v-timeline-item class="mb-1" dot-color='grey' fill-dot size='x-small'>
				<v-card class="elevation-2 " variant='outlined'>
					<v-card-title class="text-subtitle-1 text-secondary">
						🕋 EC2 프리티어 사용 베포
					</v-card-title>
					<v-card-text class="font-weight-light">
						<div> 한번 public ip로 올려보고 싶었음</div>
					</v-card-text>
				</v-card>
			</v-timeline-item>

			<v-timeline-item class="mb-1" dot-color='grey' fill-dot size='x-small'>
				<v-card class="elevation-2 " variant='outlined'>
					<v-card-title class="text-subtitle-1 text-secondary">
						📺 퍼블리싱 + 기본적인 디자인 구현
					</v-card-title>
					<v-card-text class="font-weight-light">
						<div> vuetify의 도움을 무진장받음</div>
					</v-card-text>
				</v-card>
			</v-timeline-item>
			<v-timeline-item class="mb-1" dot-color='grey' fill-dot size='x-small'>
				<v-card class="elevation-2 " variant='outlined'>
					<v-card-title class="text-subtitle-1 text-secondary">
						📺💻 vue2 + Typescript기반 반응형 frontend 초기셋
					</v-card-title>
					<v-card-text class="font-weight-light">
						<div>
							익숙해서 그 당시 가장 많이 접하는 조합이었음</div>
					</v-card-text>
				</v-card>
			</v-timeline-item>
			<v-timeline-item class="mb-1" dot-color='grey' fill-dot size='x-small'>
				<v-card class="elevation-2 " variant='outlined'>
					<v-card-title class="text-subtitle-1 text-secondary">
						🕋 Rout53 도메인구매
					</v-card-title>
					<v-card-text class="font-weight-light">
						<div>
							ssl 수동으로 직접한다
						</div>
						<v-btn variant='tonal' href="https://daylog.nald.me/infralogs/on-premise-kubernetes/1.-kubernetes"
							target="_blank" class="mt-3">
							More detail here <i class="mdi mdi-link-variant"></i>
						</v-btn>
					</v-card-text>
				</v-card>
			</v-timeline-item>
			<v-timeline-item hide-dot class="primary--text text-right mt-12 mb-12" color="black" large>
				<h2>2022년</h2>
			</v-timeline-item>
			<v-timeline-item class="mb-1" dot-color='grey' fill-dot size='x-small'>
				...
			</v-timeline-item>
		</v-timeline>
	</div>
</template>


<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.project-history-wrap {
	max-width: 1300px;
	margin: auto;
	padding: 50px;
	background-color: #1E1E1E;
}

.elevation-2 {
	width: 100%;
}
</style>
