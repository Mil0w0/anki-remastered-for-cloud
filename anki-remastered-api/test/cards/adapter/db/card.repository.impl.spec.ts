import {Card} from "../../../../src/cards/domain/card.entity";
import {CardRepositoryImpl} from "../../../../src/cards/adapters/db/card.repository.impl";
import {Category} from "../../../../src/cards/domain/category.enum";
import {LocalDateUtils} from "../../../../src/utils/local.date.utils";

describe('CardRepositoryImpl', () => {
    let repository: CardRepositoryImpl;

    beforeEach(() => {
        repository = new CardRepositoryImpl();
    });

    it('should save a card and retrieve it by ID', async () => {
        const card: Card = new Card(
            '1',
            Category.FIRST,
            'Test Card',
            'A test card',
            'test-tag',
        );
        await repository.save(card);
        const foundCard = await repository.findById('1');

        expect(foundCard).toEqual(card);
    });

    it('should return undefined if card is not found by ID', async () => {
        const foundCard = await repository.findById('non-existent-id');

        expect(foundCard).toBeUndefined();
    });

    it('should return all saved cards', async () => {
        const card1: Card = new Card(
            '1',
            Category.FIRST,
            'Card One',
            'First test card',
            'test-tag',
        );
        const card2: Card = new Card(
            '2',
            Category.SECOND,
            'Card Two',
            'Second test card',
            'test-tag',
        );

        await repository.save(card1);
        await repository.save(card2);

        const allCards = await repository.findAll();

        expect(allCards).toHaveLength(2);
        expect(allCards).toContainEqual(card1);
        expect(allCards).toContainEqual(card2);
    });

    it('should return an empty array when no cards are saved', async () => {
        const allCards = await repository.findAll();

        expect(allCards).toEqual([]);
    });

    it('should update an existing card when saved again with the same ID', async () => {
        const originalCard: Card = new Card(
            '1',
            Category.FIRST,
            'Original Card',
            'Original description',
            'test-tag',
        );
        const updatedCard: Card = new Card(
            '1',
            Category.SECOND,
            'Updated Card',
            'Updated description',
            'test-tag',
        );
        updatedCard.lastResponseDate = LocalDateUtils.today();
        await repository.save(originalCard);
        const foundOriginalCard = await repository.findById('1');

        expect(foundOriginalCard ).toEqual(originalCard);
        expect( foundOriginalCard ).not.toEqual(updatedCard); // Ensure it's actually


        await repository.save(updatedCard); // This should update the card

        const foundCard = await repository.findById('1');

        expect(foundCard).toEqual(updatedCard);
        expect(foundCard).not.toEqual(originalCard); // Ensure it's actually updated
    });
});
