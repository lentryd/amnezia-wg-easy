<template>
  <main v-if="data">
    <FormElement @submit.prevent="submit">
      <FormGroup>
        <FormNumberField
          id="mtu"
          v-model="data.mtu"
          :label="$t('general.mtu')"
          :description="$t('admin.interface.mtuDesc')"
        />
        <FormNumberField
          id="port"
          v-model="data.port"
          :label="$t('general.port')"
          :description="$t('admin.interface.portDesc')"
        />
        <FormTextField
          id="device"
          v-model="data.device"
          :label="$t('admin.interface.device')"
          :description="$t('admin.interface.deviceDesc')"
        />
      </FormGroup>
      <FormGroup>
        <FormHeading>{{ $t('admin.interface.amnezia.title') }}</FormHeading>
        <div class="col-span-2 mb-4">
          <FormSecondaryActionField
            :label="$t('admin.interface.amnezia.generateRandom')"
            @click="generateRandomAmnezia"
          />
        </div>
        <FormNumberField
          id="jc"
          v-model="data.jc"
          :label="$t('admin.interface.amnezia.jc')"
          :description="$t('admin.interface.amnezia.jcDesc')"
          :min="1"
          :max="255"
        />
        <FormNumberField
          id="jmin"
          v-model="data.jmin"
          :label="$t('admin.interface.amnezia.jmin')"
          :description="$t('admin.interface.amnezia.jminDesc')"
          :min="1"
          :max="65535"
        />
        <FormNumberField
          id="jmax"
          v-model="data.jmax"
          :label="$t('admin.interface.amnezia.jmax')"
          :description="$t('admin.interface.amnezia.jmaxDesc')"
          :min="1"
          :max="65535"
        />
        <FormNumberField
          id="s1"
          v-model="data.s1"
          :label="$t('admin.interface.amnezia.s1')"
          :description="$t('admin.interface.amnezia.s1Desc')"
          :min="1"
          :max="65535"
        />
        <FormNumberField
          id="s2"
          v-model="data.s2"
          :label="$t('admin.interface.amnezia.s2')"
          :description="$t('admin.interface.amnezia.s2Desc')"
          :min="1"
          :max="65535"
        />
        <FormNumberField
          id="h1"
          v-model="data.h1"
          :label="$t('admin.interface.amnezia.h1')"
          :description="$t('admin.interface.amnezia.h1Desc')"
          :min="1"
          :max="2147483647"
        />
        <FormNumberField
          id="h2"
          v-model="data.h2"
          :label="$t('admin.interface.amnezia.h2')"
          :description="$t('admin.interface.amnezia.h2Desc')"
          :min="1"
          :max="2147483647"
        />
        <FormNumberField
          id="h3"
          v-model="data.h3"
          :label="$t('admin.interface.amnezia.h3')"
          :description="$t('admin.interface.amnezia.h3Desc')"
          :min="1"
          :max="2147483647"
        />
        <FormNumberField
          id="h4"
          v-model="data.h4"
          :label="$t('admin.interface.amnezia.h4')"
          :description="$t('admin.interface.amnezia.h4Desc')"
          :min="1"
          :max="2147483647"
        />
      </FormGroup>
      <FormGroup>
        <FormHeading>{{ $t('form.actions') }}</FormHeading>
        <FormPrimaryActionField type="submit" :label="$t('form.save')" />
        <FormSecondaryActionField :label="$t('form.revert')" @click="revert" />
        <AdminCidrDialog
          trigger-class="col-span-2"
          :ipv4-cidr="data.ipv4Cidr"
          :ipv6-cidr="data.ipv6Cidr"
          @change="changeCidr"
        >
          <FormSecondaryActionField
            :label="$t('admin.interface.changeCidr')"
            class="w-full"
            tabindex="-1"
          />
        </AdminCidrDialog>
        <AdminRestartInterfaceDialog
          trigger-class="col-span-2"
          @restart="restartInterface"
        >
          <FormSecondaryActionField
            :label="$t('admin.interface.restart')"
            class="w-full"
            tabindex="-1"
          />
        </AdminRestartInterfaceDialog>
      </FormGroup>
    </FormElement>
  </main>
</template>

<script setup lang="ts">
const { t } = useI18n();

const { data: _data, refresh } = await useFetch(`/api/admin/interface`, {
  method: 'get',
});

const data = toRef(_data.value);

const _submit = useSubmit(
  `/api/admin/interface`,
  {
    method: 'post',
  },
  { revert }
);

function submit() {
  return _submit(data.value);
}

async function revert() {
  await refresh();
  data.value = toRef(_data.value).value;
}

const _changeCidr = useSubmit(
  `/api/admin/interface/cidr`,
  {
    method: 'post',
  },
  {
    revert,
    successMsg: t('admin.interface.cidrSuccess'),
  }
);

async function changeCidr(ipv4Cidr: string, ipv6Cidr: string) {
  await _changeCidr({ ipv4Cidr, ipv6Cidr });
}

const _restartInterface = useSubmit(
  `/api/admin/interface/restart`,
  {
    method: 'post',
  },
  {
    revert,
    successMsg: t('admin.interface.restartSuccess'),
  }
);

async function restartInterface() {
  await _restartInterface(undefined);
}

async function generateRandomAmnezia() {
  try {
    const randomValues = await $fetch('/api/admin/interface/amnezia-random');
    Object.assign(data.value, randomValues);
  } catch (error) {
    // Fallback to client-side generation
    data.value.jc = Math.floor(Math.random() * 8) + 3; // 3-10
    data.value.jmin = 50; // Fixed
    data.value.jmax = 1000; // Fixed
    data.value.s1 = Math.floor(Math.random() * 136) + 15; // 15-150
    data.value.s2 = Math.floor(Math.random() * 136) + 15; // 15-150
    data.value.h1 = Math.floor(Math.random() * 2147483647) + 1; // 1-2147483647
    data.value.h2 = Math.floor(Math.random() * 2147483647) + 1; // 1-2147483647
    data.value.h3 = Math.floor(Math.random() * 2147483647) + 1; // 1-2147483647
    data.value.h4 = Math.floor(Math.random() * 2147483647) + 1; // 1-2147483647
  }
}
</script>
