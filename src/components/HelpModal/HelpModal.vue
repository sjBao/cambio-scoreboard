<template>
  <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h2>Cambio Card Powers</h2>
        <button class="close-button" @click="closeModal" aria-label="Close help modal">×</button>
      </div>

      <div class="modal-content">
        <div class="card-section">
          <div class="card-info">
            <div class="card-icons">
              <IconCard7 />
              <IconCard8 />
            </div>
            <div class="card-description">
              <h4>Look at Self</h4>
              <p>Look at one of your own cards without revealing it to other players.</p>
            </div>
          </div>

          <div class="card-info">
            <div class="card-icons">
              <IconCard9 />
              <IconCard10 />
            </div>
            <div class="card-description">
              <h4>Look at Others</h4>
              <p>Look at one of another player's cards without them knowing which card you saw.</p>
            </div>
          </div>

          <div class="card-info">
            <div class="card-icons">
              <IconCardJack />
              <IconCardQueen />
            </div>
            <div class="card-description">
              <h4>Blind Swap</h4>
              <p>
                Swap one of your cards with one of another player's cards (both cards remain face
                down).
              </p>
            </div>
          </div>

          <div class="card-info">
            <div class="card-icons">
              <IconCardKingBlack />
            </div>
            <div class="card-description">
              <h4>Look & Swap</h4>
              <p>
                Look at one of another player's cards, then decide whether to swap it with one of
                your cards.
              </p>
            </div>
          </div>

          <div class="card-info">
            <div class="card-icons">
              <IconCardKingRed />
            </div>
            <div class="card-description">
              <h4>-1 Point</h4>
              <p>Worth negative one point at the end of the round (reduces your total score).</p>
            </div>
          </div>

          <div class="card-info">
            <div class="card-icons">
              <IconCardJoker />
            </div>
            <div class="card-description">
              <h4>Zero Points</h4>
              <p>Worth zero points at the end of the round (neutral card).</p>
            </div>
          </div>
        </div>

        <div class="game-tip">
          <h3>💡 Pro Tip</h3>
          <p>
            Use special cards strategically! Remember what you've seen and try to swap high-value
            cards for lower ones.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconCard7 from '../icons/IconCard7.vue'
import IconCard8 from '../icons/IconCard8.vue'
import IconCard9 from '../icons/IconCard9.vue'
import IconCard10 from '../icons/IconCard10.vue'
import IconCardJack from '../icons/IconCardJack.vue'
import IconCardQueen from '../icons/IconCardQueen.vue'
import IconCardKingBlack from '../icons/IconCardKingBlack.vue'
import IconCardKingRed from '../icons/IconCardKingRed.vue'
import IconCardJoker from '../icons/IconCardJoker.vue'

interface Props {
  isOpen: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const handleOverlayClick = (e: Event) => {
  const target = e.target as HTMLElement
  const currentTarget = e.currentTarget as HTMLElement
  if (target === currentTarget) {
    emit('close')
  }
}

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-container {
  background-color: var(--color-background);
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--color-border);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--color-border);
}

.modal-header h2 {
  margin: 0;
  color: var(--color-heading);
  font-size: 1.5rem;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--color-text);
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.close-button:hover {
  background-color: var(--color-background-mute);
}

.modal-content {
  padding: 24px;
}

.card-section h3 {
  margin: 0 0 20px 0;
  color: var(--color-heading);
  font-size: 1.2rem;
  font-weight: 600;
}

.card-info {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background-color: var(--color-background-soft);
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.card-icons {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  align-items: center;
  min-width: 80px;
  justify-content: center;
}

.card-description h4 {
  margin: 0 0 8px 0;
  color: var(--color-heading);
  font-size: 1rem;
  font-weight: 600;
}

.card-description p {
  margin: 0;
  color: var(--color-text);
  line-height: 1.5;
  font-size: 0.9rem;
}

.game-tip {
  margin-top: 32px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(218, 165, 32, 0.1) 0%, rgba(218, 165, 32, 0.05) 100%);
  border-radius: 8px;
  border: 1px solid rgba(218, 165, 32, 0.2);
}

.game-tip h3 {
  margin: 0 0 12px 0;
  color: var(--color-heading);
  font-size: 1.1rem;
  font-weight: 600;
}

.game-tip p {
  margin: 0;
  color: var(--color-text);
  line-height: 1.5;
  font-style: italic;
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .modal-overlay {
    padding: 10px;
  }

  .modal-container {
    max-height: 95vh;
  }

  .modal-header {
    padding: 16px 20px 12px;
  }

  .modal-header h2 {
    font-size: 1.3rem;
  }

  .modal-content {
    padding: 20px;
  }

  .card-info {
    flex-direction: column;
    gap: 12px;
  }

  .card-icons {
    min-width: auto;
    justify-content: flex-start;
  }
}
</style>
