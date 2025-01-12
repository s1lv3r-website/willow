<svelte:options runes={true} />

<script lang="ts">
  import { chunkString } from '$lib';
  import Paypal from '$lib/components/svgs/paypal.svelte';
  import Onlyfans from '$lib/components/svgs/onlyfans.svelte';
  import Patreon from '$lib/components/svgs/patreon.svelte';
  import Throne from '$lib/components/svgs/throne.svelte';
  import QRCode from 'qrcode';
  import type { Component } from 'svelte';
  import { Clipboard } from 'lucide-svelte';

  type ActiveSite = {
    title: string;
    link: string;
    icon: Component;
    active: true;
  };
  type DisabledSite = {
    title: string;
    placeholder?: string;
    icon?: Component;
    active: false;
  };

  const conventionalSites: (ActiveSite | DisabledSite)[] = [
    {
      title: 'PayPal',
      link: 'https://www.paypal.com/ncp/payment/CP2TBGMGQF63C',
      icon: Paypal,
      active: true,
    },
    {
      title: 'OnlyFans',
      link: 'https://onlyfans.com/willowwould',
      icon: Onlyfans,
      active: true,
    },
    {
      title: 'Patreon',
      link: 'https://patreon.com/willowwould',
      icon: Patreon,
      active: true,
    },
    {
      title: 'Throne',
      link: 'https://throne.com/willowwould',
      icon: Throne,
      active: true,
    },
  ];

  const cryptoCurrencies = $state<
    {
      name: string;
      notes?: string;
      address: string;
      show?: boolean;
    }[]
  >([
    {
      name: 'Bitcoin',
      notes: 'Mainnet, no bitcoin cash',
      address: 'bc1q2wlttlatq0qq7mwlvxta69qckaxs30k89nurfv',
    },
    {
      name: 'Ethereum',
      notes: 'Mainnet, including tokens',
      address: '0xA2E1a7Dd12c5B8b388a85a19Ec76f59638861563',
    },
    {
      name: 'Solana',
      notes: 'Including compatible tokens like USDC',
      address: 'HFKvNd95hXVRpT6CMiNdGneQtXbVomNYYWKfYHLPvzgW',
    },
    {
      name: 'Litecoin',
      notes: '',
      address: 'ltc1q786tm0vpamm9aldelwxd463ee0ywd9ugs2k5l8',
    },
    {
      name: 'Monero',
      notes: '',
      address:
        '84o7Na2RfxjfJ7CfwLU4zW2LwsbiSJZyreRVyGtq4pdQHYzf2CRjzwPP2sbm247duhBY6TQqg7FkVYYGgMMRmZEM92Kcays',
    },
  ]);
  const cryptoQrCodes: string[] = cryptoCurrencies.map((curreny) => {
    let svg = '';
    QRCode.toString(curreny.address, { type: 'svg' }, (err, str) => (svg = str));
    return svg;
  });

  let openCurrency = $state<number | null>(0);

  function toggleOpen(index: number) {
    openCurrency === index ? (openCurrency = null) : (openCurrency = index);
  }

  function formatAddress(address: string, splitSize = 4, beforeParts = 2, afterParts = 3): string {
    const parts = chunkString(address, splitSize);
    let output = '';

    if (beforeParts + afterParts >= parts.length) {
      return parts.join(' ');
    }

    for (let i = 0; i < beforeParts; i++) {
      output += parts[i] + ' ';
    }

    output += '....';

    for (let i = parts.length - afterParts; i < parts.length; i++) {
      output += ' ' + parts[i];
    }

    return output;
  }
</script>

<div class="p-4">
  <h1>WillowWould</h1>

  <h2>Conventional</h2>
  <div class="grid grid-cols-1 gap-4 px-5 text-center md:grid-cols-3">
    {#each conventionalSites as site}
      <a
        href={site.active ? site.link : null}
        title={site.active ? site.title : site.placeholder}
        target="_blank"
        rel="noopener noreferrer"
        class={['container-box', { 'brightness-75 hover:cursor-not-allowed': !site.active }]}
      >
        <h3>
          <span class="inline-block w-6 p-[2px] align-middle">
            <site.icon />
          </span>
          {site.title}
        </h3>
      </a>
    {/each}
  </div>

  <h2>Crypto</h2>
  <div class="grid grid-cols-2 gap-4 px-5 md:grid-cols-2">
    {#each cryptoCurrencies as currency, index}
      {@const open = openCurrency === index}
      <div
        onclick={() => toggleOpen(index)}
        onkeyup={() => {}}
        role="button"
        tabindex={index}
        class={['container-box relative text-center', { 'md:col-start-1 md:col-end-3': open }]}
      >
        <h3>{currency.name}</h3>
        {#if currency.notes}
          <p class="text-neutral-400">{currency.notes}</p>
        {/if}
        {#if open}
          <div class="flex w-full flex-row justify-center p-3">
            <div class="h-40 w-40">
              {@html cryptoQrCodes[index]}
            </div>
          </div>
        {/if}
        <code class="rounded-md bg-neutral-900 px-2 py-1">
          {open ? chunkString(currency.address, 4).join(' ') : formatAddress(currency.address)}
        </code>
        <Clipboard
          onclick={(e) => {
            navigator.clipboard.writeText(currency.address);
            alert(`Copied address for ${currency.name} to clipboard.`);
            e.stopPropagation();
          }}
          class="absolute right-3.5 top-3.5 h-6 w-6 cursor-copy rounded-md p-1 hover:bg-neutral-600 active:bg-neutral-700"
        />
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .container-box {
    @apply rounded-md bg-neutral-800 px-1 py-2 transition-all hover:bg-neutral-700 hover:shadow-md md:p-3;
  }
</style>
