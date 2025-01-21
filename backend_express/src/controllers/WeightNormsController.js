const moment = require('moment');
const Parrot = require('../models/Parrot');
const WeightNorms = require('../models/WeightNorm');



const addWeightRecord = async (req, res) => {
    try {
        const { parrotId } = req.params;
        const { date, weight } = req.body;

        if (!date || !weight) {
            return res.status(400).json({ message: 'Date and weight are required.' });
        }

        const parrot = await Parrot.findById(parrotId);
        if (!parrot) {
            return res.status(404).json({ message: 'Parrot not found.' });
        }

        const inputDate = moment(date);
        const currentWeekStart = moment(inputDate).startOf('isoWeek'); // Początek tygodnia dla podanej daty

        // Sprawdź, czy istnieją dane z poprzedniego tygodnia w `weightRecords`
        if (parrot.weightRecords.length > 0) {
            const firstRecordWeekStart = moment(parrot.weightRecords[0].date).startOf('isoWeek');

            if (!firstRecordWeekStart.isSame(currentWeekStart)) {
                // Przenieś dane do `historicalWeightRecords`
                parrot.historicalWeightRecords.push([...parrot.weightRecords]);
                parrot.weightRecords = [];
            }
        }

        // Sprawdź, czy dla tej daty jest już wpis
        const existingRecord = parrot.weightRecords.find((record) =>
            moment(record.date).isSame(inputDate, 'day')
        );

        if (existingRecord) {
            return res.status(400).json({ message: 'Weight for this date has already been recorded.' });
        }

        // Dodaj nowy rekord
        parrot.weightRecords.push({ date, weight });
        await parrot.save();

        // Przygotowanie odpowiedzi
        res.status(200).json({
            message: 'Weight record added successfully.',
            parrot: {
                _id: parrot._id,
                weightRecords: parrot.weightRecords,
                historicalWeightRecords: parrot.historicalWeightRecords,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error adding weight record.', error: error.message });
    }
};





const getWeightRecordsForWeek = async (req, res) => {
    try {
        const { parrotId } = req.params;

        // Znajdź papugę
        const parrot = await Parrot.findById(parrotId);
        if (!parrot) {
            return res.status(404).json({ message: 'Parrot not found.' });
        }

        // Znajdź normy wagowe dla gatunku papugi
        const weightNorms = await WeightNorms.findOne({ species: parrot.species });
        if (!weightNorms) {
            return res.status(404).json({
                message: `No weight norms found for species: ${parrot.species}`
            });
        }

        // Przygotuj odpowiedź
        res.status(200).json({
            currentWeek: parrot.weightRecords, // Dane bieżącego tygodnia
            historicalWeightRecords: parrot.historicalWeightRecords, // Dane historyczne
            weeklyWeightNorms: weightNorms.weeklyWeightNorms // Normy wagowe dla bieżącego tygodnia
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching weight records.', error: error.message });
    }
};

module.exports = {
    addWeightRecord,
    getWeightRecordsForWeek
};
